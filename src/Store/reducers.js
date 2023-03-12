import {combineReducers} from "redux";
import { ApplicationsReducer } from "../Modules/Applications/duck/reducer";
import {LoginReducer} from "../Modules/Auth/Login/duck/reducer";
import { ComplaintsReducer } from "../Modules/Complaints/duck/reducer";


const reducers = combineReducers({
    login: LoginReducer,
    applicationsReducer : ApplicationsReducer,
    complaintsReducer:ComplaintsReducer
})

export default reducers;