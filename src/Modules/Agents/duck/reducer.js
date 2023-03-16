import { ActionTypes } from "./type";

export const AgentsReducer = (state = {
    errorMessage: "",
    isLoading: false,
    agents: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_AGENTS_LIST:
            return {
                ...state,
                agents: action.payload
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

