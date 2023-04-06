import {combineReducers} from "redux";
import { AccountPayableReducer } from "../Modules/AccountsPayable/duck/reducer";
import { AccountsReceivableReducer } from "../Modules/AccountsReceivable/duck/reducer";
import { AgentReducer } from "../Modules/Agents/AgentsDashboard/duck/reducer";
import { AgentsReducer } from "../Modules/Agents/duck/reducer";
import { ApplicationsReducer } from "../Modules/Applications/duck/reducer";
import {LoginReducer} from "../Modules/Auth/Login/duck/reducer";
import { ComplaintsReducer } from "../Modules/Complaints/duck/reducer";
import { ExpenditureReducer } from "../Modules/Expenditure/duck/reducer";
import { JobsReducer } from "../Modules/Jobs/duck/reducer";
import { PayoutsReducer } from "../Modules/Payouts/duck/reducer";
import { TicketsReducer } from "../Modules/Tickets/duck/reducer";


const reducers = combineReducers({
    login: LoginReducer,
    applicationsReducer : ApplicationsReducer,
    complaintsReducer:ComplaintsReducer,
    payoutsReducer: PayoutsReducer,
    agentsReducer: AgentsReducer,
    agentReducer: AgentReducer,
    vendorsReducer: JobsReducer,
    ticketsReducer: TicketsReducer,
    expenditureReducer: ExpenditureReducer,
    accountsPayableReducer: AccountPayableReducer,
    accountsReceivableReducer: AccountsReceivableReducer,
})

export default reducers;