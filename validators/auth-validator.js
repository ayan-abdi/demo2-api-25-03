const yup = require('yup'); 

const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+$/;

const authValidator = yup.object().shape({
    pseudo: yup.string().trim().required().min(3).max(50),
    email: yup.string(255).trim().required().max(255),
    password: yup.string().required().min(8).matches(pwdRegex)
});
const loginValidator = yup.object().shape({
    identifier: yup.string().trim().required(),
    password: yup.string().required()
});


module.exports = {
    authValidator,
    loginValidator
};