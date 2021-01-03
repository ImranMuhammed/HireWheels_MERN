/* const MongoDB=require('../db/mongo')
const authController=require('../controller/auth')
const refString=require('../constants/refStrings')
const express=require('express');
const config=require('../config/config')
const app=express();

const PORT=config.server.port;

async function main(fisrtName,lastName,email,password,mobileNo){
    try{
        //Reference 
        let frontEndHardcodeData={};

        await MongoDB.connectDB()
        .then((success)=>{
            app.listen(PORT,()=>{
                console.log("Admin connected")
            })
            console.log("DB Connected");
            console.log("System Initialization completed")
        })
        .catch((error)=>{
            console.log(error)
        });

        //Add Admin User
        await authController.signUp(fisrtName,lastName,email,password,mobileNo,refString.admin);
        console.log("Admin added");

        frontEndHardcodeData.admin={
            email:email,
            password:password
        }
    }
    catch(error){
        console.log(error)
    }
}

const fisrtName="Mohammed";
const lastName="Imran";
const email="imran@gmail.com";
const password="admin@123";
const mobileNo="123456789";
main(fisrtName,lastName,email,password,mobileNo); */