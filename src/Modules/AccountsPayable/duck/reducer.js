import { ActionTypes } from "./type";

export const AccountPayableReducer = (state = {
    errorMessage: "",
    isLoading: false,
    accountsPayable: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_ACCOUNTS_PAYABLE:
            return {
                ...state,
                accountsPayable: action.payload
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

