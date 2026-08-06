import { CheckCircle, AlertTriangle, Send } from "lucide-react";
import {FaTelegramPlane, FaWhatsapp} from "react-icons/fa";

const notification = [
    {
        id: 1,
        app: "Telegram",
        status: "Danger",
        message: "Suhu 33.2°C dan Kelembapan 70%",
        time: "12:00 WIB"
    },
    {
        id: 2,
        app: "Whatsapp",
        status: "Success",
        label: "Suhu Normal",
        message: "Suhu 30.2°C dan Kelembapan 75%",
        time: "11:00 WIB"
    },
];

export default function NotificationPanel(){
    return(
        <div className="bg-[#111827] border border-[#293548] rounded-2xl p-5 h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-white font-semibold text-lg">Notifikasi</h2>
                <button className="text-[#00E676] text-sm hover:underline">Lihat Semua</button>
            </div>
            {/* List */}
            <div className="space-y-4">
                {notification.map((item) => (
                    <div 
                        key={item.id}
                        className="bg-[#172133] rounded-xl p-4 border border-[#293548] hover:border-[#3B4A5F] hover:bg-[#1A2436] transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                            {/* Atas */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center">
                                        {item.app === "telegram" ? (<FaTelegramPlane size={22} className="text-[#229ED9]"/>) : (<FaWhatsapp size={22} className="text-[#25D366]"/>)}
                                    </div>
                                    <span className="text-white font-medium">
                                        {item.app === "telegram" ? "Telegram" : "Whatsapp"}
                                    </span>
                                </div>
                                {/* Badge */}
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    item.status === "Success" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
                                }`}>● {item.status === "Success" ? "Success" : "Danger"}</span>
                            </div>
                            {/* Isi */}
                            <p className="text-gray-300 text-sm mt-4">Laporan berhasil dikirim</p>
                            <p className={`mt-1 font-medium text-sm ${
                                item.status === "Success" ? "text-green-400" : "text-red-400"
                            }`}>{item.message}</p>
                            {/* Jam */}
                            <p className="text-gray-500 text-xs mt-3">{item.time}</p>
                        </div>
                ))}
            </div>
        </div>
    );
}