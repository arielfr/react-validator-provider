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
     * Just to be more clearly
     * @param ref
     */
    setReference(ref) {
      this.node = ref;
    }

    render() {
      const validatorProvider = {
        isValid: this.context.isValid,
        getInvalid: this.context.getInvalid,
      };

      return (<ComponentToWrap {...this.props} validatorProvider={validatorProvider} />);
    }
  }

  ComponentWithValidation.contextTypes = {
    isValid: PropTypes.func,
    getInvalid: PropTypes.func,
  };

  return ComponentWithValidation;
};
