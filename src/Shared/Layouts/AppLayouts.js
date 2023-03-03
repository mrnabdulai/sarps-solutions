import {Outlet} from "react-router-dom";
import NavBar from "../Components/Core/NavBar";
import Sidebar from "../Components/Core/SideBar/Sidebar";

export default function AppLayouts () {

    return (
        <div className='flex  items-stretch'>
        <Sidebar />
    
        <div className='flex pl-[32px]  flex-col flex-auto bg-[#F9F9FC]'>
          <NavBar />
    
          {/* Body */}
          <div className="flex-auto overflow-scroll">
        
        <Outlet />

          </div>
        </div>
      </div>
    );
}
