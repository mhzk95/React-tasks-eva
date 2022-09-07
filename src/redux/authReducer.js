import {LOGIN_SUCCESS,LOGIN_FAILURE,LOGIN_START, GET_API_DATA} from './types'

const initialState = {
    loading:true,
    userDetails:null,
    apiData:null
}
 
const authReducer = (state={...initialState},action) => {
    switch(action.type){
        case LOGIN_START:
            return {...state,loading: true}
        case LOGIN_SUCCESS:
            return {loading:false,userDetails:action.payload}
        case LOGIN_FAILURE:
            return {...state,loading:false}
        case GET_API_DATA:
            return {...state,apiData:action.payload}
        default: return state
    }
}

export default authReducer;