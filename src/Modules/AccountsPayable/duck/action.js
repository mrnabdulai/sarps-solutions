import {ActionTypes} from "./type";
import axios from "axios";





export const doSetAccountsPayable = (data) => {
    return {
        type: ActionTypes.SET_ACCOUNTS_PAYABLE,
        payload: data
    }
}