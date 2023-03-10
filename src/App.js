import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./Modules/Auth/Login";
import Welcome from "./Modules/Welcome";
import { useSelector } from 'react-redux';
import AppLayouts from './Shared/Layouts/AppLayouts';
import Dashboard from './Modules/Dashboard';
import AddUser from './Modules/User/AddUser';
import AddUserSucess from './Modules/User/AddUser/AddUserSucess';
import ClientList from './Modules/Clients/List';
import ApplicationList from './Modules/Applications';
import ApplicationDetails from './Modules/Applications/ApplicationDetails';

function App() {
  const isAuth = !!useSelector(state => state.login.token)
  console.log(isAuth)
  return (
      <Router>
        <Routes>
        <Route path="/" element={isAuth ? <Navigate to='/app' /> : <Login/>}/>
        <Route path="/" element={isAuth ? <Navigate to='/app/applications/list' /> : <Login/>}/>
            <Route path="/login" element={isAuth ? <Navigate to='/app/applications/list' /> :<Login/>}/>
            <Route path="/user">
              <Route path="add" element={<AddUser />} />
              <Route path="add-success" element={<AddUserSucess />} />
            </Route>
            <Route path='/app' element={<AppLayouts />}>
            <Route path='dashboard' element={<Dashboard  />} />
            {/* Application routes */}
            <Route path='applications/list' element={<ApplicationList />} />
            <Route path='applications/:id' element={<ApplicationDetails />} />
            <Route path="clients/list" element={<ClientList />} />
            </Route>
        </Routes>
      </Router>
  );
}

export default App;
