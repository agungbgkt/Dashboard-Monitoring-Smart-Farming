import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Devices from "../pages/Devices";
import History from "../pages/History";

export default function DashboardLayout(){
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return(
        <div className="h-screen bg-[#0B1220] flex flex-col">
            {/* Navbar */}
            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}/>
            {/* Body */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar
                    sidebarOpen={sidebarOpen}/>
                {/* Content */}
                <main className={`flex-1 left-5 min-h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-20"} overflow-y-auto p-8 bg-[#0B1220] pt-20 pl-10`}>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}