import { ActionTypes } from "./type";

export const JobsReducer = (state = {
    errorMessage: "",
    isLoading: false,
    vendors: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_JOBS_LIST:
            return {
                ...state,
                vendors: action.payload
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

