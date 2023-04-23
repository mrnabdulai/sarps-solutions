import {ActionTypes} from "./type";
import axios from "axios";





export const doSetApplications = (applicationsList) => {
    return {
        type: ActionTypes.SET_APPLICATIONS_LIST,
        payload: applicationsList
    }
}