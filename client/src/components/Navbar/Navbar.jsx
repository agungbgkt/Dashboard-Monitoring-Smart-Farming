import logo from "../../assets/logo.jpeg";
import { Menu, Bell, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();
    return (
        <nav className="w-full bg-[#111827] border-b border-[#293548] py-2.5 sm:py-3 px-3 sm:px-5 lg:px-8 fixed top-0 left-0 right-0 z-50 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center min-w-0">
                {/* Menu */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-[#1A2436] transition-all duration-300 shrink-0">
                    <Menu size={24} className="text-white cursor-pointer"/>
                </button>
                {/* Logo */}
                <img
                    src={logo}
                    alt="Smart Farming"
                    className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain rounded-full ml-2 sm:ml-3 lg:ml-4 shrink-0"/>
                {/* Title */}
                <div className="ml-2 sm:ml-3 lg:ml-5 min-w-0">
                    <h1 className="text-white font-semibold text-base sm:text-lg lg:text-xl truncate">Smart Farming</h1>
                    <p className="text-slate-400 text-xs sm:text-sm hidden sm:block">Sistem Monitoring</p>
                </div>
            </div>
            {/* Right */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 shrink-0">
                {/* Notifications */}
                <button
                    onClick={() => navigate("/notifikasi")}
                    className="relative cursor-pointer p-1.5 sm:p-2 rounded-lg hover:bg-[#1A2436] transition-all duration-300">
                    <Bell size={20} className="text-white sm:w-[22px] sm:h-[22px]"/>
                    {/* Notification indicator */}
                    <span className="absolute top-1 right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full"/>
                </button>
                {/* User */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <UserCircle
                        size={32}
                        className="text-white sm:w-[36px] sm:h-[36px] lg:w-[38px] lg:h-[38px]"
                        strokeWidth={1}
                    />
                    {/* User information */}
                    <div className="hidden sm:block">
                        <p className="text-white font-medium text-sm lg:text-base">Admin</p>
                        <p className="text-slate-400 text-xs lg:text-sm">Online</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}