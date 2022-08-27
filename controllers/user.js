const User = require("../models/user.js");
const {
    emailValidation,
    nameValidation,
    genderValidation,
    dateValidation,
} = require("../helpers/validation");
const { encrypt } = require("../helpers/encNdyc");
exports.register = async (req, res) => {
    const {
        first_name,
        last_name,
        username,
        email,
        password,
        gender,
        bYear,
        bMonth,
        bDay,
    } = await req.body;
    let validateFirstName = nameValidation(first_name, 3, 30);
    let validateLastName = nameValidation(last_name, 3, 30);
    let validateEmail = await emailValidation(email);
    let validatePassword = await encrypt(password);
    let validateGender = await genderValidation(gender);
    let validateDate = Date.parse(`${bMonth}/${bDay}/${bYear}`);

    // First name validation
    if (validateFirstName.status) {
        // Last name validation
        if (validateLastName.status) {
            // Email validation
            if (validateEmail.status) {
                // Password validation
                if (validatePassword.status) {
                    // Gender validation
                    if (validateGender.status) {
                        // Date Validation
                        if (!isNaN(validateDate)) {
                            const user = new User({
                                first_name,
                                last_name,
                                username,
                                email,
                                password : validatePassword,
                                gender,
                                bYear,
                                bMonth,
                                bDay,
                            });
                            user.save().then((response) => {
                                res.send(response);
                            });

                        } else {
                            res.status(400).json({
                                message: "Date is incorrect",
                                statusCode: 400,
                            });
                        }
                    } else {
                        res.status(400).json({
                            message: validateGender.message,
                            statusCode: 400,
                        });
                    }
                } else {
                    res.status(400).json({
                        message: validatePassword.message,
                        statusCode: 400,
                    });
                }
            } else {
                res.status(400).json({
                    message: validateEmail.message,
                    statusCode: 400,
                });
            }
        } else {
            res.status(400).json({
                message:
                    "Last Name does not matched with minimum and maximum requirements",
                statusCode: 400,
            });
        }
    } else {
        res.status(400).json({
            message:
                "First Name does not matched with minimum and maximum requirements",
            statusCode: 400,
        });
    }




};

exports.login = async (req, res) => {
    res.status(200).send("user found");
};
