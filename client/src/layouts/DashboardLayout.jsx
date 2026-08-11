import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from "../pages/Dashboard";
import Device from "../pages/Devices";

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
                <main className="flex-1 p-8">
                    <Dashboard/>
                    <Device />
                </main>
            </div>
        </div>
    );
}