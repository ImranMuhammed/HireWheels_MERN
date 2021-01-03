const { userErrors } = require('../constants/errors');
const refStrings = require('../constants/refStrings');
const { db } = require('../models/user');
const UserModel=require('../models/user');
const userException=require('../tools/userException');
const util = require('../tools/util');


const signUp=async(firstName,lastName,email,mobileNo,password,roleName=refStrings.user)=>{
    try{

        let userAlreadyExist;
        let userDoc={};
        let userData;
        let response={}

        //Lowercase the email;
        email=email.toLowerCase();

        //Check if email is already exist
        userAlreadyExist=await UserModel.findOne({email});
        if(userAlreadyExist!=null) throw new userException(userErrors.emailAlreadyExist);

        //Check if mobile number already exist
        userAlreadyExist=await UserModel.findOne({mobileNo});
        if(userAlreadyExist!=null) throw new userException(userErrors.mobileAlreadyExist);

        //Check for password Validation
        if(password.length<5) throw new  userException(userErrors.passwordValidation);

        //Hash Password
        password=await util.generateHashPassword(password);

        //Create document to save in DB

        userDoc={
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            mobileNo:mobileNo,
            roleName:roleName,
            walletMoney:100000
        }

        userData=await UserModel.create([userDoc])

        //Get JWT token
        jwtToken=util.createJWTToken(userData);
        
        //response.headers(jwtToken);
        response=userData

        return {...response,"jwtToken":jwtToken}
    }
    catch(error){
        throw error;
    }
}

const login=async(email,password)=>{

    try{
        //reference
        let userData;
        let dbPassword;
        let isPasswordValid;
        let jwtToken;
        let response={};

        //Get UserData
        userData=await UserModel.findOne({email});
        

        if(userData==null) throw new userException(userErrors.userNotRegistered);

        //validate Password
        dbPassword=userData.password;
        

        isPasswordValid=await util.validatePassword(password,dbPassword);

        if(!isPasswordValid) throw new userException(userErrors.invalidLoginDetails);

        //JWT
        jwtToken=util.createJWTToken(userData);

        //response.headers(jwtToken);
        response=userData

        return {...response,"jwtToken":jwtToken}
    }
    catch(error){
        throw error;
    }

}

module.exports={
    signUp,
    login
}