export default function StatsCard({
    title, value, subtitle, icon, borderColor, iconColor, backgroundColor
}){
    return(
        <div className="rounded-2xl border p-6 transition-all duration-300 ease-out hover:scale-[1.03] hover:-transition-y-1 hover:shadow-2xl" style={{borderColor: borderColor, background: backgroundColor}}>
            <div className="flex items-center gap-5">
                {/* icon */}
                <div className="w-18 h-18 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{borderColor: borderColor, color: iconColor,}}>{icon}</div>
                {/* text */}
                <div className="flex flex-col">
                    <h3 className="text-gray-200 text-2xl font-medium">{title}</h3>
                    <h1 className="text-white text-6xl font-semibold mt-2 leading-none">{value}</h1>
                    <p className="text-gray-400 text-lg mt-2">{subtitle}</p>
                </div>
            </div>
        </div>
    )
}