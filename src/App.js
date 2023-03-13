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

function App() {
  const isAuth = !!useSelector(state => state.login.token)
  const userAuth = sessionStorage.getItem("user")
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
        <Route path="/user/*" element={userAuth ?  <UserRoot /> : <Navigate to="/user/login" replace/>} >
          <Route path="profile" element={<UserProfile  />} />
          <Route path="dashboard" element={<UserApplicationsList  />} />
          <Route path="complaints" element={<UserComplaints  />} />
          <Route path="applications/:id" element={<UserApplicationDetails  />} />
        
        </Route>
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/login" element={userAuth ? <Navigate to="/user/dashboard" /> : <UserAuth /> } />
          <Route path="/user/add-success" element={<AddUserSucess isAdmin={isAuth}/>} />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
