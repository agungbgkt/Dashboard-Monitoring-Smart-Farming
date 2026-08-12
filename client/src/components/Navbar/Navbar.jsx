import logo from "../../assets/logo.jpeg";
import { Menu } from "lucide-react";

import{
    Bell, UserCircle
} from "lucide-react";

export default function Navbar({sidebarOpen, setSidebarOpen}){

    return(
        <nav className={`w-full bg-[#111827] border-b border-[#293548] py-3 flex items-center justify-between px-8 fixed top-0 left-0 right-0 z-50`}>
            {/* Left */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-[#1A2436] transition-all duration-300">
                        <Menu size={24} className="text-white cursor-pointer"></Menu>
                </button>
                <img src={logo} alt="Smart Farming" className="w-12 h-12 object-contain rounded-full ml-4"/>
                <div>
                    <h1 className="text-white font-semibold text-xl ml-5">Smart Farming</h1>
                    <p className="text-slate-400 text-sm ml-5">Sistem Monitoring</p>
                </div>
            </div>
            {/* Right */}
            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative cursor-pointer">
                    <Bell size={23} className="text-white"/>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </button>
                {/* User */}
                <div className="flex items-center gap-3">
                    <UserCircle size={38} className="text-white" strokeWidth={1}/>
                    <div>
                        <p className="text-white font-medium">Admin</p>
                        <p className="text-slate-400">Online</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}