import { ActionTypes } from "./type";

export const ComplaintsReducer = (state = {
    errorMessage: "",
    isLoading: false,
    complaints: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_COMPLAINTS_LIST:
            return {
                ...state,
                complaints: action.payload
            }
        // case ActionTypes.LOGGING_IN:
        //     return {
        //         ...state,
        //         isLoading: true
        //     }
        // case ActionTypes.LOGGED_IN:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         token: action.payload
        //     }
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

