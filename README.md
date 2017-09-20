# Validator Provider (React)

High-Order Component (Provider) to validate components inside a container (Ex.: Form). It's going to provide a way to validate the childrens without knowing them and have no "references" to them without using Redux or any other Plugin.

This works using the High-Order Component pattern, so all of your Components to be validated and the validator must be stateful.

## Usage

Lets see an example, where you got a `Form` component (validator) and an `CustomInput` (validated) component that needs to be validated.

```javascript
const { ValidationProvider } = require('ValidationProvider');
const Form = require('FormComponent');
const CustomInput = require('CustomInput');

const Page = (props) => (
  <ValidationProvider>
    <Form method="POST">
      <label>
        <CustomInput />
      </label>
    </Form>
  </ValidationProvider>
);
```

Fist we need to understand that you have two types of Component:

- validator: This is the component that is going to check that all the components inside are valid
- validated: This is the component that is going to execute the validations

### Injections

Continue with the example, you have two injections possibles:

- injectValidator: For the validator component
- injectValidations: For the validated components

We need to inject the Components to work:

#### Form Component

You need to wrap your module.exports Component Class with `injectValidator` method. This method will wrap your Component inside another one, but passing a prop called `validatorProvider`.

This `validatorProvider` is going to provide two methods:

- isValid: Return a boolean if all the components are valid or invalid. **true if valid**
- getInvalid: Is going to return an array with the component references

Let's continue with the example, if i have a Form that only needs to be submited if the child components are valid, we are going to wrap the components. See the next example:

```javascript
const React = require('react');
const { injectValidator } = require('ValidationProvider');

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(event) {
    if( !this.props.validationProvider.isValid() ) {
      event.preventDefault();
    }
  }
  
  render() {
    return (
      <form method={this.props.method} onSubmit={this.onSubmit}>
        {this.props.children}
      </form>
    );
  };
}

module.exports = injectValidator(Form);
```

See that the Form is only going to be submit if the components are valid.

### isValid Method

This method is going to execute the `validate` method inside the component (validated). In this example, you need to implement the validate method on CustomInput component.

If you dont implement this, you are going to receive a `log` on the terminal letting you know that you **must** implement the validate, if not, your component is always valid.

> The **isValid** Method is going to call the **getInvalid** and check the array length.

#### CustomInput Component

You need to wrap your module.exports Component Class with `injectValidations` method. This method will wrap your component inside another and is going to be the one that **register** your component on the provider.

If you don't wrap the Component that you want to validate inside the inject, the provider is not going to be aware of them.

```javascript
const React = require('react');
const { injectValidations } = require('ValidationProvider');

class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
  }
  
  validate() {
    return (this.input.value === '');
  }
  
  render() {
    return (<input value={this.props.value} ref={el => (this.input = el)} />);
  };
}

module.exports = injectValidations(CustomInput);
```

Here, you can see that the validate function is only checked that the field is not empty

## Validations

You can use the `validate` method to do the actual validations, or, you can validate the inputs on change and show the messages on real time. If you want this, you can use the validate only to return if valid or not depending on a state variable and get a better performance when validating.

In the next example, i am going to use the validate to send if the component is valid, but not doing the actual validation. I'm using the onChange to validate the Input, and maybe i can show the error message on the HTML too, and leaving the validate only to prevent the form to submit.

```javascript
const React = require('react');
const { injectValidations } = require('ValidationProvider');

class CustomInput extends React.Component {
  constructor(props) {
    super(props);
    
    // Set if valid on the state
    this.state = {
      valid: false
    };
    
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  validate() {
    return this.state.valid;
  }
  
  onChange() {
    // Maybe show the error here too
    this.setState({
      valid: (this.input.value === '')
    });
  }
  
  render() {
    return (<input value={this.props.value} ref={el => (this.input = el)} onChange={onChange} />);
  };
}

module.exports = injectValidations(CustomInput);
```

## Not only for forms

You can inject the validator on another Component, could be a button, or something else, but, the main use is going to be a form.

# License

Copyright 2017 Ariel Rey. Released under the terms of the MIT license.

# Pull Requests

Im open to all fixes and improvements that you can make. Please send your Pull Request