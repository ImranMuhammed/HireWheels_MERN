const { userErrors } = require('../constants/errors');
const util=require('../tools/util');
const userException = require('./userException');
const jwt=require('jsonwebtoken')
const config=require('../config/config');
const refString=require('../constants/refStrings')

const isUserAuthenticated=async(req,res,next)=>{
    try{
        //Reference
        let authorization;

        //Get Aithorization
        authorization=req.headers['x-access-token'];

        //Check if auth exist
        if(!authorization) throw new userException(userErrors.missingAuth);

      await jwt.verify(authorization,config.jwt.secretKey, async(error,decoded)=>{
            if(error){
                throw new userException(userErrors.invalidAuth);
            }

            //Check Role
            roleName=decoded.roleName;
            if(roleName!=refString.user) throw new userException(userErrors.unAuthorizedAccess);

            //Assign Data
            req.auth=decoded;

            //Forward request
            next();
        })
        
    }
    catch(exception){
        await util.handleErrorResponse(exception,res)
    }
}

const isAdminAuthenticated=async(req,res,next)=>{
    try{
        //Reference
        let authorization;

        //Get Aithorization
        authorization=req.headers['x-access-token'];

        //Check if auth exist
        if(!authorization) throw new userException(userErrors.missingAuth);

        await jwt.verify(authorization,config.jwt.secretKey, async(error,decoded)=>{
            if(error){
                throw new userException(userErrors.invalidAuth);
            }

            //Check Role
            roleName=decoded.roleName;
            if(roleName!=refString.admin) throw new userException(userErrors.unAuthorizedAccess);

            //Assign Data
            req.auth=decoded;

            //Forward request
            next();
        })
    }
    catch(exception){
        await util.handleErrorResponse(exception,res)
    }
    
}

module.exports={
    isUserAuthenticated,
    isAdminAuthenticated
}