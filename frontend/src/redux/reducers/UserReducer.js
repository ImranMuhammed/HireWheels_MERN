import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "../../constants/UserConstants";

const initialState={
    userId:undefined,
    firstName:undefined,
    lastName:undefined,
    email:undefined,
    mobileNo:undefined,
    password:undefined,
    walletMoney:undefined,
    roleName:undefined,
    jwtToken:undefined
}

function userLoginReducer(state=initialState,action){
    const loginData=action.payload;
    switch(action.type){
        case USER_LOGIN_REQUEST : return {loading:true};
        case USER_LOGIN_SUCCESS : return {
                                        loading:false,
                                       userInfo: {...state,
                                        "userId":loginData.userId,
                                        "firstName":loginData.firstName,
                                        "lastName":loginData.lastName,
                                        "email":loginData.email,
                                        "mobileNo":loginData.mobileNo,
                                        "password":loginData.password,
                                        "walletMoney":loginData.mobileNo,
                                        "roleName":loginData.roleName,
                                        "jwtToken":loginData.jwtToken
                                       }
                                       
                                    }
        case USER_LOGIN_FAIL : return {
                                        loading:false,
                                        error:action.payload
                                     }
        case USER_LOGOUT_SUCCESS : return {
                                            userInfo: {...state,
                                                "userId":undefined,
                                                "firstName":undefined,
                                                "lastName":undefined,
                                                "email":undefined,
                                                "mobileNo":undefined,
                                                "password":undefined,
                                                "walletMoney":undefined,
                                                "roleName":undefined,
                                                "jwtToken":undefined
                                            }
                                     }
        default : return state;
    }
}


export{userLoginReducer}