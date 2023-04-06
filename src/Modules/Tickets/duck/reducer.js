import { ActionTypes } from "./type";

export const TicketsReducer = (state = {
    errorMessage: "",
    isLoading: false,
    tickets: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_TICKETS_LIST:
            return {
                ...state,
                tickets: action.payload
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

