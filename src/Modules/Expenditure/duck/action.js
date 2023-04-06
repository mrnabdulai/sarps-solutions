import {ActionTypes} from "./type";
import axios from "axios";





export const doSetExpenditure = (expenditure) => {
    return {
        type: ActionTypes.SET_EXPENDITURE_LIST,
        payload: expenditure
    }
}