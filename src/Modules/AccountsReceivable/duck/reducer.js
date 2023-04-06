import { ActionTypes } from "./type";

export const AccountsReceivableReducer = (state = {
    errorMessage: "",
    isLoading: false,
    accountsReceivables: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_ACCOUNTS_RECEIVABLE:
            return {
                ...state,
                accountsReceivables: action.payload
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

