import { CHANGE_COLOR } from "./types";

const initialState = {
    color: true
}

const colorReducer = (state={...initialState},action) => {
    switch(action.type){
        case CHANGE_COLOR:
            return {...state,color: !state.color}
        default:
            return state
    }
}

export default colorReducer;