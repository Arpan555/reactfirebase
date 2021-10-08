import { CHAT_DATA, LOGIN_DATA, SIGNUP_DATA } from "./index";
export const chatData=(data)=>{
    return{
        type:CHAT_DATA,
        payload:data
    }
}
export const signupData=(data)=>{
    return{
        type:SIGNUP_DATA,
        payload:data
    }
}
export const loginData=(data)=>{
    return{
        type:LOGIN_DATA,
        payload:data
    }
}