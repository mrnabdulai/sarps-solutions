import { ActionTypes } from "./types"

export const doSetAgent = (agent) => {
    return {
        type: ActionTypes.SET_AGENT,
        payload: agent
    }
}