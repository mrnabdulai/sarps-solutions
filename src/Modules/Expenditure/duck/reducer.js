import { ActionTypes } from "./type";

export const ExpenditureReducer = (state = {
    errorMessage: "",
    isLoading: false,
    expenditure: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_EXPENDITURE_LIST:
            return {
                ...state,
                expenditure: action.payload
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

