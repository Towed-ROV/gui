export const validateInput = (value) => {
  let error;
  if (!value) {
    error = "Value is required";
  } else if (isNaN(value)) {
    error = "Not a number";
  }
  return error;
};

export const validateStringInput = (value) => {
  let error;
  if (!value) {
    error = "Session name required";
  } else if (value.length < 6) {
    error = " That's a bit short, isn't it?";
  } else if (value.length > 30) {
    error = "WOW, easy there tiger! A bit long?";
  } else {
    // let userExist = false;
    // const r =
  }
  console.log("validating ..");
  return error;
};
