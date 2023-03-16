import {ActionTypes} from "./type";
import axios from "axios";





export const doSetAgents = (agents) => {
    return {
        type: ActionTypes.SET_AGENTS_LIST,
        payload: agents
    }
}