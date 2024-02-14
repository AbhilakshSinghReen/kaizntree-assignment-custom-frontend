const validators = {
  email: () => {},
  username: () => {},
  password: () => {},
};

const availableValidators = new Set(Object.keys(validators));

function validateFields(fields, returnEmptyErrors = false) {
  const validationErrors = {};

  for (const fieldName in fields) {
    let fieldValidationError = "";

    if (availableValidators.has(fieldName)) {
      fieldValidationError = validators[fieldName](fields[fieldName]);
    } else {
      console.log(`Validation logic for field of type ${fieldName} has not been implemented. `);
    }

    if (fieldValidationError !== "" || returnEmptyErrors) {
      validationErrors[fieldName] = fieldValidationError;
    }
  }

  return validationErrors;
}

export default validateFields;
