const ValidationProvider = require('./components/ValidationProvider');
const injectValidations = require('./injectors/validations');
const injectValidator = require('./injectors/validator');

/**
 * Export ValidationProvider Component
 * @type {ValidationProvider}
 */
exports.ValidationProvider = ValidationProvider;

/**
 * Export injectValidation method (Add To Component)
 * @type {(p1:*)}
 */
exports.injectValidations = injectValidations;

/**
 * Export injectValidator method (Add to the Form Component)
 */
exports.injectValidator = injectValidator;
