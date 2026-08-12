import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Smartphone } from "lucide-react";
import api from "../api/api";

export default function History(){
    const {deviceId} = useParams();
    const navigate = useNavigate();

    const [devices, setDevices] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    
    const [historyLoading, setHistoryLoading] = useState(false);
    const [historyError, setHistoryError] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ambil data device
    useEffect(() =>{
        const fetchDevices = async()=>{
            try{
                const response = await api.get("/devices");
                console.log("Data Devices:", response.data);
                setDevices(response.data.data || response.data);
            } catch(error){
                console.error("Gagal mengambil data device:", error);
                setError("Gagal mengambil data perangkat");
            } finally{
                setLoading(false);
            }
        };
        fetchDevices();
    },[]);
    // tentukan perangkat aktif
    const activeDeviceId = deviceId ? Number(deviceId) : devices[0]?.id;
    const activeDevice = devices.find((device) => device.id === activeDeviceId);

    // ambil data history berdasarkan device
    useEffect(() => {
        const fetchHistory = async()=>{
            if(!activeDeviceId) return;

            try{

                setHistoryLoading(true);
                setHistoryError(null);
                const response = await api.get("/monitoring-logs", {params: {
                    device_id: activeDeviceId, per_page: 20,
                },});
                console.log("History:", response.data);
                setHistoryData(response.data.data?.data || []);
            } catch(error){
                console.log("Gagal mengambil data:", error);
                setHistoryError("Gagal mengambil data history");
                setHistoryData([]);
            } finally {
                setHistoryLoading(false);
            }
        };
        fetchHistory();
    }, [activeDeviceId]);
    // loading
    if(loading){
        return(
            <div className="text-gray-400">Memuat data perangkat...</div>
        );
    }
    // error
    if(error){
        return(
            <div className="text-red-500">{error}</div>
        );
    }
    // tidak ada perangkat
    if(devices.length === 0){
        return(
            <div className="text-gray-400">Tidak ada perangkat tersedia.</div>
        );
    }

    return(
        <div className="min-h-screen">
            <div className="bg-[#0B1220]">
                {/* header */}
                <h1 className="text-3xl font-bold text-white">
                    History Data
                </h1>
                <p className="text-gray-400 mt-2">
                    Riwayat data sensor setiap perangkat 
                </p>
            </div>
            {/* Device Card */}
            <div className="">
                <h3 className="text-xl font-semibold text-white mb-4">Pilih Perangkat</h3>
                <div className="grid grid-cols-3 gap-6">
                    {devices.map((device) =>{
                        const isActive = device.id === activeDeviceId;
                        return(
                            <div 
                                key={device.id} 
                                onClick={() => navigate(`/history-data/${device.id}`)} className={`rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${isActive ? "border-[#00E676] bg-[#00E676]/10" : "border-[#293548] bg-[#293548]"}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? "bg-[#00E676]/10 text-[#00E676]" : "bg-[#172133] text-gray-400"}`}><Smartphone size={24}/></div>
                                        <div>
                                            <h3 className="text-white font-bold">{device.device_name}</h3>
                                            <p className="text-white font-bold mt-1">ID: {device.id}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${device.status === true ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                            {device.status === true ? "Online" : "Offline"}
                                        </span>
                                    </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Active Device */}
            <div className="bg-[#111827] border border-[#293548] rounded-2xl p-6 mt-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">
                            History Perangkat
                        </p>
                        <h2 className="text-2xl font-bold text-white mt-1">
                            {activeDevice?.device_name}
                        </h2>
                        <p className="text-gray-500 text-semibold mt-1">
                            Kode: {activeDevice?.device_code}
                        </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm ${activeDevice?.status === true ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                        {activeDevice?.status === true ? "Online" : "Offline"}
                    </div>
                </div>
            </div>
            {/* History Data */}
            <div className="bg-[#111827] border border-[#293548] rounded-2xl p-6 mt-4">
                <h2 className="text-xl font-semibold text-white">
                    Riwayat Suhu
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                    Data Suhu {activeDevice?.device_name}
                </p>
                {/* History Loading */}
                {historyLoading && (
                    <div className="text-gray-400 text-center py-10">Memuat data history...</div>
                )}
                {/* History Error */}
                {!historyLoading && historyError && (
                    <div className="text-red-400 text-center py-10">{historyError}</div>
                )}
                {/* Tidak Ada Data */}
                {!historyLoading && !historyError && historyData.length === 0 && (
                    <div className="text-gray-400 text-center py-10">Belum ada data history.</div>
                )}

                {/* Table */}
                {!historyLoading && !historyError && historyData.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#293548] text-left">
                                <th className="py-4 px-4 text-gray-400 font-medium">
                                    No.
                                </th>
                                <th className="py-4 px-4 text-gray-400 font-medium">
                                    Waktu
                                </th>
                                <th className="py-4 px-4 text-gray-400 font-medium">
                                    Suhu
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.map((log, index) => (
                                <tr key={log.id} className="border-b border-[#293548] hover:bg-[#172133] transition">
                                    <td className="py-4 px-4 text-gray-400">
                                        {index + 1}
                                    </td>
                                    <td className="py-4 px-4 text-gray-400">
                                        {new Date(log.recorded_at).toLocaleString("id-ID")}
                                    </td>
                                    <td className="py-4 px-4 text-gray-400">
                                        {log.temperature}°C
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        </div>
    )
}