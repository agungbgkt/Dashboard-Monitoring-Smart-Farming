import { LayoutDashboard, Activity, History, Cpu, FileText, Settings, LogOut, Bell, } from "lucide-react";
import MenuItem from "./MenuItem";

export default function Sidebar({sidebarOpen}){
    const menus = [
        {
            title:"Dashboard",
            icon:<LayoutDashboard size={20}
            className="cursor-pointer"/>,
            active:true
        },
        {
            title:"Perangkat",
            icon:<Cpu size={20}
            className="cursor-pointer"/>,
        },
        {
            title:"History Data",
            icon:<History size={20}
            className="cursor-pointer"/>
        },
        {
            title:"Laporan",
            icon:<FileText size={20}
            className="cursor-pointer"/>
        },
        {
            title:"Notifikasi",
            icon:<Bell size={20}
            className="cursor-pointer"/>
        }
    ];
    return(
        <aside className={`bg-[#111827] border-r border-[#293548] transition-all duration-300 overflow-hidden ${sidebarOpen? "w-72":"w-0"} flex flex-col justify-between`}>
            <div className="px-5 py-6">
                {
                    menus.map((menu,index) => (
                        <MenuItem key={index} {...menu}/>
                    ))
                }
            </div>
            <div className="px-5 border-t border-[#293548]">
                <MenuItem title="Settings" icon={<Settings size={20} className="cursor-pointer"/>}/>
                <MenuItem title="Logout" icon={<LogOut size={20} className="cursor-pointer"/>}/>
            </div>
        </aside>
    )
}