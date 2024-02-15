const validators = {
  email: (value) => {
    return value === "" ? "Email cannot be empty." : "";
  },
  fullName: (value) => {
    if (value === "") {
      return "Full Name cannot be empty.";
    }

    const fullNameParts = value.trimStart().trimEnd().split(" ");
    if (fullNameParts.length === 1) {
      return "Please enter your full name.";
    }

    return "";
  },
  username: (value) => {
    return value === "" ? "Username cannot be empty." : "";
  },
  password: (value) => {
    return value === "" ? "Password cannot be empty." : "";
  },
  organization: (value) => {
    return value === "" ? "Organization cannot be empty." : "";
  },
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
