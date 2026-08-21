import { CheckCircle, AlertTriangle } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotificationPanel({ notifications = [] }) {
    const navigate = useNavigate();
    // Ambil hanya beberapa notifikasi terbaru untuk Dashboard
    const latestNotifications = notifications.slice(0, 3);

    const isDanger = (status) => {
        return [
            "SUHU TINGGI",
            "SUHU RENDAH",
            "KELEMBAPAN TINGGI",
            "KELEMBAPAN RENDAH"
        ].includes(status);
    };

    return (
        <div className="bg-[#111827] border border-[#293548] rounded-2xl p-4 sm:p-5 w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-5 gap-3">
                <div>
                    <h2 className=" text-white font-semibold text-base sm:text-lg">Notifikasi</h2>
                    <p className=" text-gray-500 text-xs mt-1 hidden sm:block">Notifikasi monitoring terbaru</p>
                </div>
                <button
                    onClick={() => navigate("/notifikasi")}
                    className="text-[#00E676] text-xs sm:text-sm hover:underline whitespace-nowrap">
                    Lihat Semua
                </button>
            </div>
            {/* Empty */}
            {latestNotifications.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle size={32} className="text-green-400 mb-2"/>
                    <p className="text-gray-400 text-sm">Belum ada notifikasi</p>
                </div>
            )}
            {/* List */}
            <div className="space-y-3">

                {latestNotifications.map((item) => {

                    const danger = isDanger(item.status);

                    return (
                        <div
                            key={item.id}
                            className="bg-[#172133] rounded-xl p-3 sm:p-4 border border-[#293548] hover:border-[#3B4A5F] hover:bg-[#1A2436] transition-all duration-300">
                            {/* Top */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111827] flex items-center justify-center shrink-0">
                                        <FaTelegramPlane size={19} className="text-[#229ED9]"/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white font-medium text-sm">Telegram</p>
                                        <p className=" text-gray-500 text-xs truncate">
                                            {item.device?.device_name || "Perangkat"}
                                        </p>
                                    </div>
                                </div>
                                {/* Status */}
                                <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap ${danger ? "bg-red-500/15 text-red-400" : "bg-green-500/15 text-green-400"}`}>
                                    {danger ? "● Danger" : "● Success"}
                                </span>
                            </div>
                            {/* Message */}
                            <p className="text-gray-300 text-xs sm:text-sm mt-3 sm:mt-4">
                                {item.message || "Laporan monitoring"}
                            </p>
                            {/* Sensor Data */}
                            <p className={`mt-1 font-medium text-xs sm:text-sm ${danger ? "text-red-400" : "text-green-400"}`}>
                                Suhu {item.temperature ?? "--"}°C
                                {" || "}
                                Kelembapan {item.humidity ?? "--"}%
                            </p>
                            {/* Time */}
                            <p className="text-gray-500 text-[11px] sm:text-xs mt-2 sm:mt-3">
                                {item.send_at ? new Date(item.send_at).toLocaleString("id-ID"): "-"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}