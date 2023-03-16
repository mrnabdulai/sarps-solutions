import { ActionTypes } from "./type";

export const PayoutsReducer = (state = {
    errorMessage: "",
    isLoading: false,
    payouts: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_PAYOUTS_LIST:
            return {
                ...state,
                payouts: action.payload
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

