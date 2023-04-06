import { ActionTypes } from "./type";

export const StaffReducer = (state = {
    errorMessage: "",
    isLoading: false,
    staff: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_STAFF_LIST:
            return {
                ...state,
                staff: action.payload
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

