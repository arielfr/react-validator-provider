const ValidatorProvider = require('./components/ValidatorProvider');
const injectValidations = require('./injectors/validations');
const injectValidator = require('./injectors/validator');

/**
 * Export ValidatorProvider Component
 * @type {ValidatorProvider}
 */
exports.ValidatorProvider = ValidatorProvider;

/**
 * Export injectValidation method (Add To Component)
 * @type {(p1:*)}
 */
exports.injectValidations = injectValidations;

/**
 * Export injectValidator method (Add to the Form Component)
 */
exports.injectValidator = injectValidator;
