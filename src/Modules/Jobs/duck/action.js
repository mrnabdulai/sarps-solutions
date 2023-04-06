import {ActionTypes} from "./type";
import axios from "axios";





export const doSetJobs = (jobs) => {
    return {
        type: ActionTypes.SET_JOBS_LIST,
        payload: jobs
    }
}