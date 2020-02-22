import _ from 'lodash';
import Validator from '../../constants/validator';
import { FORM_ERRORS } from '../../constants/formErrors';

export const resetInputValidation = (props) => {
  const { formValidations = [] } = props;
  // Find better solution than modifying props
  formValidations.forEach((validation) => {
    validation.error = false;
  });
}

export const getFormError = (props, formValidations = []) => {
  const { label } = props;
  const formValidationError = formValidations.find((validation) => validation.error);
  let formErrorText = '';
  if (formValidationError) {
    const formInputLabel = label || 'Given field';
    formErrorText = `${formInputLabel} ${FORM_ERRORS[formValidationError.validator]}`;
  }
  return formErrorText;
}

export const validateForError = (props, value) => {
  const { formValidations = [] } = props;
  const validations = _.cloneDeep(formValidations);
  const isValueValid = validations.every((validationRule) => {
    const rule = Validator[validationRule.validator];
    const isValid = rule(value);
    if (!isValid) {
      validationRule.error = true;
    }
    return isValid;
  });

  if (!isValueValid) {
    return getFormError(props, validations);
  }
  return false;
}