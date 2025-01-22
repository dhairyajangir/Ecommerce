const validationFormObject={
    validateName:(name) => {
        const nameRegex = /^[a-zA-Z][a-zA-Z\s'-]{1,49}$/;
        if(name.length < 2){
            return 'Name cannot have less than 2 letters';
        }
        if(!nameRegex.test(name)){
            return 'Name should not have any symbols'
        }
        return true;
    },
    validatePassword: (password) => {
        const passwordRegex = {
            minLength: 8,
            maxLength: 128,
            hasUpperCase: /[A-Z]/,
            hasLowerCase: /[a-z]/,
            hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        };
        if(password.length < passwordRegex.minLength){
            return 'Password should be more than or equal to 8 chars';
        }
        if(password.length > passwordRegex.maxLength){
            return 'Password should be less than 128 chars';
        }
        if(!passwordRegex.hasUpperCase.test(password)){
            return 'Password should have atleast 1 uppercase char'
        }
        if(!passwordRegex.hasSpecialChar.test(password)){
            return 'Password should have atleast 1 special char'
        }
        return true;
    },
    validateEmail: (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(email.length > 254){
            return {isValid:false, error:'Email too long'};
        }
        if(!emailRegex.test(email)){
            return 'Write the email in correct format';
        }
        return true;
    }
}

export default validationFormObject;