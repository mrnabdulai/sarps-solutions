import {ActionTypes} from "./type";
import axios from "axios";





export const doSetTickets = (tickets) => {
    return {
        type: ActionTypes.SET_TICKETS_LIST,
        payload: tickets
    }
}