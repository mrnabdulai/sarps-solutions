import { ActionTypes } from "./type";

export const ApplicationsReducer = (state = {
    errorMessage: "",
    isLoading: false,
    applications: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_APPLICATIONS_LIST:
            return {
                ...state,
                applications: action.payload
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

