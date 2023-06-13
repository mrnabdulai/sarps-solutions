export const getSurnameValidator = (value) => {
    let error;
    if (!value) {
        error = "Surname is required";
    }
    if (value.length < 3) {
        error = "Surname must be at least 3 characters long";
    }
    return error;
}
export const getOtherNamesValidator = (value) => {
    let error;
    if (!value) {
        error = "Surname is required";
    }
    if (value.length < 3) {
        error = "Surname must be at least 3 characters long";
    }
    return error;
}

export const genericRequired = (value) => {
    let error;
    if (!value) {
        error = "required";
    }
    if (value.length < 2) {
        error = "must be at least 2 characters long";
    }
    return error;
}

export const genericMetricValidator = (value) => {
    let error;
    let valueAsInt = +value
    if (value <= 0) {
        error = "value must be > 1"
    }
    return error;
}

export const phoneValidator = (value) => {
    var regex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
    var phone = value.replaceAll(/\s/g, '').match(regex);
    let error;
    if (!phone) {
        error = "Phone number must be in the format  +xxx xxx-xxxx";
    }
    return error;
}


export const emailValidator = (value) => {
    var email = String(value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    let error;
    if (!email) {
        error = "Email is invalid"
    }
    return error
};

export const passwordValidator = (value) => {
    let error;
    if (value.length < 6) {
        error = "Password must be at least 6 characters long";
    }
    return error;
}