import {combineReducers} from "redux";
import { ApplicationsReducer } from "../Modules/Applications/duck/reducer";
import {LoginReducer} from "../Modules/Auth/Login/duck/reducer";


const reducers = combineReducers({
    login: LoginReducer,
    applicationsReducer : ApplicationsReducer,
})

export default reducers;