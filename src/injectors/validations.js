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
      this.context.register(this.node);
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
    register: PropTypes.func.isRequired,
  };

  return ComponentWithValidation;
};
