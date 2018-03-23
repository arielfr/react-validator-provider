const React = require('react');
const PropTypes = require('prop-types');

/**
 * Inject to Component common methods
 * Register the component on the Provider
 * @param ComponentToWrap
 * @returns {ComponentWithValidation}
 */
module.exports = (ComponentToWrap) => {
  class ComponentWithValidation extends React.Component {
    constructor(props) {
      super(props);
      this.setReference = this.setReference.bind(this);
    }

    /**
     * Register the component to render on the Provider via register method
     */
    componentDidMount() {
      // Check if the component is wrapped by the validator and have the register method injected
      if (this.context.register !== undefined) {
        this.context.register(this.node);
      }
    }

    componentWillUnmount() {
      // Check if the component is wrapped by the validator and have the register method injected
      if (this.context.unregister !== undefined) {
        this.context.unregister(this.node);
      }
    }

    /**
     * Just to be more clearly
     * @param ref
     */
    setReference(ref) {
      this.node = ref;
    }

    render() {
      return (<ComponentToWrap {...this.props} ref={this.setReference} />);
    }
  }

  ComponentWithValidation.contextTypes = {
    register: PropTypes.func,
    unregister: PropTypes.func,
  };

  return ComponentWithValidation;
};
