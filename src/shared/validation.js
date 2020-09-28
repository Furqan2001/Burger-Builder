export const checkValidationHandler = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
}