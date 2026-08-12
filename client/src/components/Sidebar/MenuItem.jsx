import {useNavigate, useLocation} from "react-router-dom";

export default function MenuItem({
    title, icon, path
}){
    const navigate = useNavigate();
    const location = useLocation();

    const active = location.pathname === path;
    return(
        <button onClick={() => navigate(path)} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-300" ${active? "bg-[#123126] text-[#00E676] border-l-2 border-[#00E676]":"text-slate-400 hover:bg-[#1A2436] hover:text-white border-l-4 border-transparent cursor-pointer"}`}>
            {icon} <span className="font-medium">{title}</span>
        </button>
    )
}