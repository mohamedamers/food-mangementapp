export const getRequiredMessage = (filedName) =>`${filedName} is required`;

export const EmailValidation ={
    required : getRequiredMessage("Email"),
    pattern :{
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Email is not valid"
    },
};

const PasswordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PasswordValidation = (filedName)=>{
    return{
        required : getRequiredMessage(filedName),
        pattern :{
            value: PasswordRegEx,
            message :
            "At least 6 characters: Uppercase/lowercase, number and special character"
        }
    }
}