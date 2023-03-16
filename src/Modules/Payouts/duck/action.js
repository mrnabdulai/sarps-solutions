import {ActionTypes} from "./type";
import axios from "axios";





export const doSetPayouts = (payouts) => {
    return {
        type: ActionTypes.SET_PAYOUTS_LIST,
        payload: payouts
    }
}