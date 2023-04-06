import { ActionTypes } from "./types"

export const AgentReducer = (state = {
 
    agent: null,
}, action) => {
    switch (action.type) {
      case ActionTypes.SET_AGENT:
            return {
                ...state,
                agent: action.payload
            }
        default:
            return state

    }
}
