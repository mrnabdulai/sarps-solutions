export const getSurnameValidator = (value) => {
    let error;
    if (!value) {
        error = "Surname is required";
    }
    if(value.length < 3){
        error = "Surname must be at least 3 characters long";
    }
    return error;
}
export const getOtherNamesValidator = (value) => {
    let error;
    if (!value) {
        error = "Surname is required";
    }
    if(value.length < 3){
        error = "Surname must be at least 3 characters long";
    }
    return error;
}

export const genericRequired = (value) => {
    let error;
    if (!value) {
        error = "required";
    }
    if(value.length < 2){
        error = "must be at least 2 characters long";
    }
    return error;
}

export const phoneValidator = (value) => {
    var regExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
  var phone = value.match(regExp);
  let error;
  if (!phone) {
    error = "Phone number must be in the format (xxx) xxx-xxxx";
  }
  return error;
}