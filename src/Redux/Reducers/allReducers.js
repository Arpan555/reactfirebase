import { CHAT_DATA, LOGIN_DATA, SIGNUP_DATA } from "../Actions/index";
const initialState={
    data:[],
    signupData:[],
    loginData:[]
}
export default function reducer(state=initialState,action)
{
    switch(action.type)
    {
        case CHAT_DATA:
            return{
                ...state,
                data:[...state.data,action.payload]
            }
        case SIGNUP_DATA:
            return{
                ...state,
                signupData:[...state.signupData,action.payload]
            }
        case LOGIN_DATA:
            return{
                ...state,
                loginData:[...state.loginData,action.payload]
            }
        default:
            return state;
    }
}