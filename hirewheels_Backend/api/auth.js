const apiValidator=require('../tools/apiValidators')
const validationError=require('../constants/errors').validationError
const util=require('../tools/util')
const authController=require('../controller/auth')
const refStrings=require('../constants/refStrings')

const signUp=async(req,res)=>{

    try{
        //Reference variables
        let validate;
        let response;
        let firstName;
        let lastName;
        let email;
        let password;
        let mobileNo;
        let userData;

        //validate request
        validate=apiValidator.signUp(req.body);
        console.log(validate.valid)
        if(!validate.valid) validationError(validate.errors)

        //Get Required Parameters
        firstName=req.body.firstName;
        lastName=req.body.lastName;
        email=req.body.email;
        password=req.body.password;
        mobileNo=req.body.mobileNo;

        //Business Logic
        userData=await authController.signUp(firstName,lastName,email,mobileNo,password);

        //get custome response
        response=await util.customResponse(userData,200)

        //Send back response
        res.status(response.statusCode).send(response.message);

    }
    catch(exception){
         util.handleErrorResponse(exception,res)
    }
    
}

const login=async(req,res)=>{
try{
    let validate;
    let email;
    let password;
    let response;
    let userData;

    //Validate request
    validate=apiValidator.login(req.body);
    if(!validate.valid) validationError(validate.errors);

    //Get required Parameters
    email=req.body.email;
    password=req.body.password;

    userData=await authController.login(email,password);

    response=await util.customResponse(userData,200)

    res.status(response.statusCode).send(response.message);

}
catch(exception){
   await util.handleErrorResponse(exception,res)
}

    
}

module.exports={signUp, login}