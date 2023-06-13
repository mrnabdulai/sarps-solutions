export const phoneValidator = (value) => {
    var regex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
    var phone = value.replaceAll(/\s/g,'').match(regex);
    let error;
    if (!phone) {
        error = "Phone number must be in the format  +xxx xxx-xxxx";
    }
    return error;
}


