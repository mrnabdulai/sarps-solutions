import { ActionTypes } from "./type";
import axios from "axios";





export const doSetStaff = (staff) => {
    return {
        type: ActionTypes.SET_STAFF_LIST,
        payload: staff
    }
}