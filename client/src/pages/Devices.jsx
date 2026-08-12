import { useState, useEffect } from "react";
import StatsCard from "../components/Cards/StatsCard";
import { Smartphone, Wifi, WifiOff } from "lucide-react";
import api from "../api/api";

export default function Devices(){
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDevices = async() => {
            try{
                const response = await api.get("/devices");
                console.log("Data Devices:", response.data);
                setDevices(response.data.data || response.data);
            } catch(error){
                console.error("Gagal mengambil data devices:", error);
                setError("Gagal mengambil data perangkat");
            } finally{
                setLoading(false);
            }
        };
        fetchDevices();
    }, [])
    // loading
    if(loading){
        return(
            <div className="text-gray-400">
                Memuat data perangkat...
            </div>
        );
    }
    // error
    if(error){
        return(
            <div className="text-red-500">
                {error}
            </div>
        );
    }
    // statistics
    const totalDevices = devices.length;
    const onlineDevices = devices.filter(
        (device) => device.status === true
    ).length;
    const offlineDevices = totalDevices - onlineDevices;

    return(
        <section id="perangkat" className="min-h-screen">
        <div className="min-h-screen space-y-8 bg-[#0B1220]">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-white">Perangkat</h2>
                <p className="text-gray-400 mt-2">Monitoring dan Status Perangkat</p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
                <StatsCard
                    title="Total Perangkat"
                    value={totalDevices}
                    subtitle="Perangkat terdaftar"
                    borderColor="#00E676"
                    backgroundColor="rgba(0,230,118,0.08)"
                    iconColor="#00E676"
                    icon={<Smartphone size={34}/>}
                />
                <StatsCard
                    title="Online"
                    value={onlineDevices}
                    subtitle="Perangkat Aktif"
                    borderColor="#00E676"
                    backgroundColor="rgba(0,230,118,0.08)"
                    iconColor="#00E676"
                    icon={<Smartphone size={34}/>}
                />
                <StatsCard
                    title="Offline"
                    value={offlineDevices}
                    subtitle="Perangkat tidak aktif"
                    borderColor="#EF4444"
                    backgroundColor="rgba(239,68,68,0.08)"
                    iconColor="#EF4444"
                    icon={<Smartphone size={34}/>}
                />
            </div>
            {/* Device List */}
            <div className="bg-[#111827] border border-[#293548] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Daftar Perangkat</h2>
                        <p className="text-gray-400 text-sm mt-1">Daftar perangkat yang terhubung</p>
                    </div>
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#293548] text-left">
                                <th className="py-4 px-4 text-gray-400 font-medium">Perangkat</th>
                                <th className="py-4 px-4 text-gray-400 font-medium">Kode</th>
                                <th className="py-4 px-4 text-gray-400 font-medium">Lokasi</th>
                                <th className="py-4 px-4 text-gray-400 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map((device) => (
                                <tr key={device.id} className="border-b border-[#293548] hover:bg-[#172133] transition">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#172133] flex items-center justify-center text-[#00e676]">{<Smartphone size={20}/>}</div>
                                            <div>
                                                <p className="text-white font-medium">{device.device_name}</p>
                                                <p className="text-gray-500 text-sm">ID: {device.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-300">{device.device_code}</td>
                                    <td className="py-4 px-4 text-gray-300">{device.location}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-sm ${device.status === true ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                            {device.status === true ? "Online" : "Offline"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </section>
    )
}