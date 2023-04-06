import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Modules/Auth/Login";
import Welcome from "./Modules/Welcome";
import { useDispatch, useSelector } from 'react-redux';
import AppLayouts from './Shared/Layouts/AppLayouts';
import Dashboard from './Modules/Dashboard';
import AddUser from './Modules/User/AddUser';
import AddUserSucess from './Modules/User/AddUser/AddUserSucess';
import ClientList from './Modules/Clients/List';
import ApplicationList from './Modules/Applications';
import ApplicationDetails from './Modules/Applications/ApplicationDetails';
import Complaints from './Modules/Complaints';
import ComplaintDetails from './Modules/Complaints/ComplaintDeatails';
import UserRoot from './Modules/User';
import { useEffect } from 'react';
import Axios from './Shared/utils/axios_instance';
import UserProfile from './Modules/User/UserProfile';
import UserApplicationsList from './Modules/User/UserApplicationsList';
import UserAuth from './Modules/User/Auth/UserAuth';
import UserComplaints from './Modules/User/UserComplaints';
import { doLogout } from './Modules/Auth/Login/duck/action';
import UserApplicationDetails from './Modules/User/UserApplicationDetails';
import Payouts from './Modules/Payouts';
import AddPayout from './Modules/Payouts/AddPayout';
import PayoutDetails from './Modules/Payouts/PayoutDetails';
import Agents from './Modules/Agents';
import AddAgent from './Modules/Agents/AddAgent';
import AgentDetails from './Modules/Agents/AgentDetails';
import AgentsRoot from './Modules/Agents/AgentsDashboard';
import AgentsDashboard from './Modules/Agents/AgentsDashboard/AgentsDashboard';
import Staff from './Modules/Staff';
import AddStaff from './Modules/Staff/AddStaff';
import Jobs from './Modules/Jobs';
import AddVendor from './Modules/Jobs/AddVendor';
import VendorDetails from './Modules/Jobs/VendorDeatails';
import Tickets from './Modules/Tickets';
import AddTicket from './Modules/Tickets/AddTicket';
import TicketDetails from './Modules/Tickets/TicketDetails';
import Events from './Modules/Events';
import Expenditure from './Modules/Expenditure';
import AddExpenditure from './Modules/Expenditure/AddExpenditure';
import ExpenditureDetails from './Modules/Expenditure/ExpenditureDetails';
import AccountPayable from './Modules/AccountsPayable';
import AddAccountPayable from './Modules/AccountsPayable/AddAccountPayable';
import AccountPayableDetails from './Modules/AccountsPayable/AccountPayableDetails';
import AccountReceivable from './Modules/AccountsReceivable';
import AddAccountReceivable from './Modules/AccountsReceivable/AddAccountReceivable';
import AccountReceivableDetails from './Modules/AccountsReceivable/AccountReceivableDetails';

function App() {
  const isAuth = !!useSelector(state => state.login.token)
  const userAuth = sessionStorage.getItem("user")
  const agentAuth = sessionStorage.getItem("agent")
  const dispatch = useDispatch()
  // const verifyToken = async () => {
  //   try {
  //     const testResponse = await Axios.get("/api/stats/getTotalApplications")
  //     if(testResponse.data.message === "Invalid Token")
  //     {
  //       dispatch(doLogout())
  //       localStorage.clear()

  //     }
  //   } catch (err) {
  //       console.log(err)
  //   }

  // }
  // useEffect(() => {
  //   verifyToken()

  // }, [false])
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to='/app/dashboard' /> : <Login />} />

        {/* <Route path="/" element={isAuth ? <Navigate to='/app/applications/list' /> : <Login />} /> */}
        <Route path="/login" element={isAuth ? <Navigate to='/app/dashboard' /> : <Login />} />
        {/* user routes  */}
        <Route path="/user/*" element={userAuth ? <UserRoot /> : <Navigate to="/user/login" replace />} >
          <Route path="profile" element={<UserProfile />} />
          <Route path="dashboard" element={<UserApplicationsList />} />
          <Route path="complaints" element={<UserComplaints />} />
          <Route path="applications/:id" element={<UserApplicationDetails />} />
        </Route>
        <Route path="/user/add" element={<AddUser />} />
        <Route path="/user/login" element={userAuth ? <Navigate to="/user/dashboard" /> : agentAuth ? <Navigate to="/agent/dashboard" /> : <UserAuth />} />
        <Route path="/user/add-success" element={<AddUserSucess isAdmin={isAuth} />} />
        <Route path='/app/*' element={isAuth ? <AppLayouts /> : <Navigate to="/login" replace />}>
          <Route path='dashboard' element={<Dashboard />} />
          {/* Application routes */}
          <Route path='applications/list' element={<ApplicationList />} />
          <Route path='applications/:id' element={<ApplicationDetails />} />
          <Route path="clients/list" element={<ClientList />} />

          {/* Complaints routes */}
          <Route path="complaints" element={<Complaints />} />
          <Route path="complaints/:id" element={<ComplaintDetails />} />
          <Route path="complaints/:id" element={<ComplaintDetails />} />


          {/* Payouts routes */}
          <Route path='payouts' element={<Payouts />} />
          <Route path='payouts/add' element={<AddPayout />} />
          <Route path='payouts/:id' element={<PayoutDetails />} />


          {/* Jobs routes */}
          <Route path="jobs" element={<Jobs />} />
          <Route path="vendors/add" element={<AddVendor />} />
          <Route path="vendors/:id" element={<VendorDetails />} />


          {/* ticket routes */}
          <Route path="general/tickets" element={<Tickets />} />
          <Route path="general/tickets/add" element={<AddTicket />} />
          <Route path="general/tickets/:id" element={<TicketDetails />} />

          {/* Event routes  */}

          <Route path="general/events" element={<Events />} />

          {/* Accounts routes */}
          <Route path="accounts/income-and-expenditure" element={<Expenditure />} />
          <Route path="accounts/income-and-expenditure/add" element={<AddExpenditure />} />
          <Route path="accounts/income-and-expenditure/:id" element={<ExpenditureDetails   />} />
          
          <Route path="accounts/account-payable" element={<AccountPayable />} />
          <Route path="accounts/account-payable/add" element={<AddAccountPayable />} />
          <Route path="accounts/account-payable/:id" element={<AccountPayableDetails   />} />
          
          <Route path="accounts/account-receivable" element={<AccountReceivable />} />
          <Route path="accounts/account-receivable/add" element={<AddAccountReceivable />} />
          <Route path="accounts/account-receivable/:id" element={<AccountReceivableDetails   />} />
          
          {/* Agents */}
          <Route path='agents' element={<Agents />} />
          <Route path='agents/add' element={<AddAgent />} />
          <Route path='agents/:id' element={<AgentDetails />} />

          {/* Staff */}
          <Route path='staff' element={<Staff />} />
          <Route path='staff/add' element={<AddStaff />} />
          <Route path='staff/:id' element={<AgentDetails />} />

        </Route>
        <Route path='/agent/*' element={agentAuth ? <AgentsRoot /> : <Navigate to="/user/login" />}  >
          <Route path='dashboard' element={<AgentsDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
