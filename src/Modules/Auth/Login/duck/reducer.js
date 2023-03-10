import { ActionTypes } from "./type";

export const LoginReducer = (state = {
    // errorMessage: "",
    // isLoading: false,
    token: localStorage.getItem('token'),
}, action) => {
    switch (action.type) {
        // case ActionTypes.LOGGING_IN:
        //     return {
        //         ...state,
        //         isLoading: true
        //     }
        case ActionTypes.LOGGED_IN:
            return {
                ...state,
                isLoading: false,
                token: action.payload
            }
        // case ActionTypes.ERROR_LOGGING_IN:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         errorMessage: action.payload
        //     }
        default:
            return state

    }
}

