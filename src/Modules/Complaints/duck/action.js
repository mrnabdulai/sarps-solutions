import {ActionTypes} from "./type";
import axios from "axios";





export const doSetComplaints = (complaints) => {
    return {
        type: ActionTypes.SET_APPLICATIONS_LIST,
        payload: complaints
    }
}