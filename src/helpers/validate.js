export const validateInput = (value) => {
    let error;
    if (!value) {
      error = "Value is required";
    } else if (isNaN(value)) {
      error = "Not a number";
    }
    return error;
};