export default function MenuItem({
    title, icon, active
}){
    return(
        <button className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-300" ${active? "bg-[#123126] text-[#00E676] border-l-2 border-[#00E676]":"text-slate-400 hover:bg-[#1A2436] hover:text-white border-l-4 border-transparent"}`}>
            {icon} <span className="font-medium">{title}</span>
        </button>
    )
}