import {USER} from '../constants/UserConstants'

export const userSigninValidation=(id,value)=>{
    let error="";
    switch(id){
        case USER.EMAIL : if(!value.includes("@") || value==="" || value==null || value==undefined)
                            error="Email id is not valid";
                            break;
        case USER.PASSWORD: if(value.length<5 || value==null || value==undefined)
                            error="Password cannot be empty. PAssword must contain atleast 5 chracters";
                            break;
                default : error="Invalid Data provided"
                            break;
                        
    }

    return error;    
}

