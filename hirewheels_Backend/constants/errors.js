function ErrorMessage(message,statusCode,result=[]){
    this.message=message;
    this.statusCode=statusCode;
    this.result=result;
}

const validationError=(array)=>{

    //Get Validation Errors
    let meta={};
    meta['validationErrors']=[];
    for(let i in array){
        meta['validationErrors'].push(array[i])
    }

    //console
    console.error( meta)

    //create Exception
    let exception={};
    exception.message="Invalid Request Format";
    exception.statusCode=400;
    throw new userException(exception);
}

//User Errors
var userErrors={};
userErrors.oopsSomethingWentWrong=new ErrorMessage("Oops! Something went wrong",500);
userErrors.emailAlreadyExist=new ErrorMessage("Email already exist",400);
userErrors.mobileAlreadyExist=new ErrorMessage("Mobile Number already exist",400);
userErrors.passwordValidation=new ErrorMessage("Password cannot be empty or less than 5 characters",400);
userErrors.userNotRegistered=new ErrorMessage("User is not Registered",400);
userErrors.invalidLoginDetails=new ErrorMessage("Incorrect Email or Password",400);
userErrors.vehicleNumberAlreadyExist=new ErrorMessage("Vehicle with the given Vehicle Number already exist",200);
userErrors.invalidVehicleData=new ErrorMessage("Vehicle details are invalid. Please check for availability of all the details",422)
userErrors.vehiclesNotAvailable=new ErrorMessage("No Vehicles are available in dataBase",200);
userErrors.invalidVehicleId=new ErrorMessage("Vehicle with the given Vehicle_Id does not exist",200);
userErrors.unavailableForBooking=new ErrorMessage("Vehicle is currently unavailable for booking",200);
userErrors.unableToRemove=new ErrorMessage("Vehicle is currently UnAvailable. Vehicle cannot be removed at the moment.",400)
userErrors.invalidDate=new ErrorMessage("DROP OFF DATE cannot be before PICKUP DATE",400);
userErrors.vehicleIsnotBooked=new ErrorMessage("Vehicle is not Booked. Cannot close booking.",400);
userErrors.insufficientBalance=new ErrorMessage("Insufficient Wallet balance",400)
userErrors.missingAuth=new ErrorMessage("Authentication Details not available",400);
userErrors.invalidAuth=new ErrorMessage("Invalid authentication details",400);
userErrors.unAuthorizedAccess=new ErrorMessage("User Authentication denied",400)

module.exports={
    validationError,
    userErrors
}