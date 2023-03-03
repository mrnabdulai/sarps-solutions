import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./Modules/Auth/Login";
import Welcome from "./Modules/Welcome";
import { useSelector } from 'react-redux';
import AppLayouts from './Shared/Layouts/AppLayouts';
import Dashboard from './Modules/Dashboard';
import AddUser from './Modules/User/AddUser';
import AddUserSucess from './Modules/User/AddUser/AddUserSucess';

function App() {
  // const isAuth = !!useSelector(state => state.login.token)
  const isAuth = true;
  return (
      <Router>
        <Routes>
        {/* <Route path="/" element={isAuth ? <Navigate to='/app' /> : <Welcome/>}/> */}
        <Route path="/" element={isAuth ? <Navigate to='/app/dashboard' /> : <Welcome/>}/>
            <Route path="/login" element={isAuth ? <Navigate to='/app' /> :<Login/>}/>
            <Route path="/user">
              <Route path="add" element={<AddUser />} />
              <Route path="add-success" element={<AddUserSucess />} />
            </Route>
            <Route path='/app' element={<AppLayouts />}>
            <Route path='dashboard' element={<Dashboard  />} />
            </Route>
        </Routes>
      </Router>
  );
}

export default App;
