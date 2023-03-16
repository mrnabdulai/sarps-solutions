import {combineReducers} from "redux";
import { AgentsReducer } from "../Modules/Agents/duck/reducer";
import { ApplicationsReducer } from "../Modules/Applications/duck/reducer";
import {LoginReducer} from "../Modules/Auth/Login/duck/reducer";
import { ComplaintsReducer } from "../Modules/Complaints/duck/reducer";
import { PayoutsReducer } from "../Modules/Payouts/duck/reducer";


const reducers = combineReducers({
    login: LoginReducer,
    applicationsReducer : ApplicationsReducer,
    complaintsReducer:ComplaintsReducer,
    payoutsReducer: PayoutsReducer,
    agentsReducer: AgentsReducer,
})

export default reducers;