const { userErrors } = require("../constants/errors");
const userException = require("./userException");
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const config=require('../config/config')

const customResponse=async(message,statusCode)=>{
    let response={};
    response['timeStamp']=new Date();
    response['message']=message;
    response['statusCode']=statusCode;

    return response;
}


const  handleErrorResponse=async(exception,res)=>{  
    let response;
    let statusCode;

    //HAndle user exceptions
    if(exception instanceof userException){
        statusCode=exception.statusCode;
        response= await customResponse(exception.message,exception.statusCode);
    }
    else{
        //Internal Server Error
        statusCode=userErrors.oopsSomethingWentWrong.statusCode;
        response=await customResponse(userErrors.oopsSomethingWentWrong.message,statusCode);
    }

    //Send Response
    console.log("Inside Handle response:",response)
    res.status(response.statusCode).send(response.message);

}

const generateHashPassword=async(password)=>{
    return new Promise((resolve,reject)=>{
        let salt=crypto.randomBytes(8).toString("hex");
        crypto.scrypt(password,salt,64,(error,derivedKey)=>{
            if(error) reject(error);
            resolve(salt+":"+derivedKey.toString('hex'))
        });
    });
}

const validatePassword=async(password,dbPassword)=>{
    return new Promise((resolve,reject)=>{
        let[salt,key]=dbPassword.split(":");
        crypto.scrypt(password,salt,64,(error,derivedKey)=>{
            if(error)
                reject(error);
            resolve(key===derivedKey.toString('hex'))
        })
    })
}

const createJWTToken=(userData)=>{
    let token=jwt.sign({
        userId:userData._id,
        sub:userData.email,
        roleName:userData.roleName,
        exp: config.jwt.expiryTime
    },config.jwt.secretKey);

    return token;
}

const getNumberOfDaysBooked=async(pickupDate,dropOffDate)=>{
    const milliSecondsPerDay=1000*60*60*24;

    const numberOfDays=await (new Date(dropOffDate) - new Date(pickupDate))/milliSecondsPerDay;

    return numberOfDays;
}

module.exports={
    handleErrorResponse,
    generateHashPassword,
    customResponse,
    validatePassword,
    createJWTToken,
    getNumberOfDaysBooked
}