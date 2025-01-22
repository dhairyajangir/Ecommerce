const ValidationFormObject={
    validateName: (name)=>{
        const nameRegex = /^[a-zA-Z][a-zA-Z\s'-]{1,49}$/;
        if(name.length<2){
            return "Name cann't have less than 2 letters"
        }
        if(!nameRegex.test(name)){
            return 'Name should not have any symbols'
        }
        return true;
    },
    validatePassword:(password)=>{
        const passwordRegex = {
            minLength: 8,
            maxLength: 128,
            hasUpperCase: /[A-Z]/,
            hasLowerCase: /[a-z]/,
            hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, // Fixed unnecessary escapes
          };
          if(password.length<passwordRegex.minLength){
            return 'Password should be more than or equal to 8 chars'
          }
          if(password.length>passwordRegex.maxLength){
            return 'Password should be less than 128 chars'
          }
          if(!passwordRegex.hasLowerCase.test(password)){
            return 'Pasword should have atleast 1 lowercase'
          }
          if(!passwordRegex.hasUpperCase.test(password)){
            return 'Pasword should have atleast 1 uppercase'
          }
          if(!passwordRegex.hasSpecialChar.test(password)){
            return 'Pasword should have atleast 1 spl char '
          }
          return true;
    },
    validateEmail:(email)=>{
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(email.length>254){
            return{isValid:false,error:'Email too long'}
        }
        if(!emailRegex.test(email)){
            return 'write the email in correct format'
        }
        return true;
    }
}
export default ValidationFormObject 