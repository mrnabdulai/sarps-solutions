import {ActionTypes} from "./type";
import {API_BASE_URL} from "../../../Shared/Constants";
import axios from "axios";


export const doLogin = ({username,password}) => {
    return async function(dispatch) {
        dispatch({type: ActionTypes.LOGGING_IN});
        //make request to login
        dispatch({type: ActionTypes.LOGGED_IN});
    }
}


export const setToken = (token) => {
    return {
        type: ActionTypes.LOGGED_IN,
        payload: token
    }
}