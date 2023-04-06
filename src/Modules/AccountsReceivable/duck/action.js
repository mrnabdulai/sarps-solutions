import {ActionTypes} from "./type";
import axios from "axios";





export const doSetAccountsReceivable = (data) => {
    return {
        type: ActionTypes.SET_ACCOUNTS_RECEIVABLE,
        payload: data
    }
}