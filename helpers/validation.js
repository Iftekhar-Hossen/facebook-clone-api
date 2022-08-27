const USER = require("../models/user");

/*
 * Email Validation *
 */

exports.emailValidation = async (email) => {
    if (
        String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    ) {
        const isUser = await USER.findOne({ email });
        if (isUser) {
            return { message: "Email already is used", status: false };
        } else {
            return { message: "Email is not used", status: true };
        }
    } else {
        return { message: "Invaild email address", status: false };
    }
};


exports.nameValidation = (name, min, max) =>{
    if(name.length < min){
        return {message: "name is smaller then minimum requirement", status: false}
    }else if( name.length > max){
        return {message: "name is getter then maximum requirement", statu: false}
    }else{
        return{ message: "this is perfect", status: true}
    }
}

exports.genderValidation = async (gender) =>{
    let gendersArray = ["male", "female", "rather not to say"]
    if(gendersArray.includes(gender)){
        return {message: "Gender founded", status: true}
    }else{
        return {message: "Gender not founded", status: false}
    }
}

exports.dateValidation = async (month, day, year)=>{
    let isValidDate = Date.parse(`${month}/${day}/${year}`);
    return isValidDate
}