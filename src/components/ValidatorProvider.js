const React = require('react');
const PropTypes = require('prop-types');

class ValidatorProvider extends React.Component {
  constructor(props) {
    super(props);
    this.components = [];
    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
    this.isValid = this.isValid.bind(this);
    this.getInvalid = this.getInvalid.bind(this);
  }

  /**
   * Register child components that need to be validated
   * @returns {{register: ValidatorProvider.register}}
   */
  getChildContext() {
    return {
      register: this.register,
      unregister: this.unregister,
      isValid: this.isValid,
      getInvalid: this.getInvalid,
    };
  }

  /**
   * Check if the components are valid using validate method (User needs to implement this on the components)
   * You can choose if you want the validator breaks on any invalid component
   * @param breakOnInvalid
   * @returns {Array}
   */
  getInvalid(breakOnInvalid = false) {
    let i = 0;
    const componentsLength = this.components.length;
    const invalid = [];

    for (; i < componentsLength; i++) {
      if (this.components[i].validate) {
        // If the method returns TRUE it means that is valid
        if (!this.components[i].validate()) {
          invalid.push(this.components[i]);
          if (breakOnInvalid) {
            break;
          }
        }
      } else {
        console.log(`You need to implement your own validator for this Component (${this.components[i].constructor.name})`);
      }
    }

    return invalid;
  }

  /**
   * Register component that needs validation
   * @param reference
   */
  register(reference) {
    // Add the component reference to the list
    this.components.push(reference);
  }

  /**
   * This method is going to remove from components list the reference that is unmount
   * @param reference
   */
  unregister(reference) {
    let indexToRemove = -1;

    this.components.forEach((ref, index) => {
      if (ref === reference) {
        indexToRemove = index;
      }
    });

    // Remove specific element from list
    if (indexToRemove !== -1) {
      this.components.splice(indexToRemove, 1);
    }
  }

  /**
   * Check if the components are valid
   * You can choose if you want the validator breaks on any invalid component
   * @param breakOnInvalid
   * @returns {boolean}
   */
  isValid(breakOnInvalid = false) {
    const components = this.getInvalid(breakOnInvalid);
    return (components.length === 0);
  }

  /**
   * Render child element
   */
  render() {
    // Prevents using a <div> to containe the element
    return React.Children.only(this.props.children);
  }
}

/**
 * Define the childComponentTypes
 */
ValidatorProvider.childContextTypes = {
  register: PropTypes.func,
  unregister: PropTypes.func,
  isValid: PropTypes.func,
  getInvalid: PropTypes.func,
};

module.exports = ValidatorProvider;
