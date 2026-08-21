import StatsCard from "../components/Cards/StatsCard";
import {Home, Thermometer, Droplets, Activity, Smartphone} from "lucide-react";
import MonitoringCards from "../components/Charts/MonitoringCharts";
import NotificationPanel from "../components/Cards/NotificationPanel";
import { useState, useEffect } from "react";
import api from "../api/api";

export default function Dashboard(){
    const [dashboard, setDashboard] = useState(null);
    // Menentukan kandang mana yang sedang ditampilkan di card atas
    const [currentCage, setCurrentCage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Data dari API
    const devices = dashboard?.devices || [];
    // Timer
    useEffect(() => {
        if (devices.length === 0) {
            return;
        }
        const interval = setInterval(() => {
            setCurrentCage((prev) => (prev + 1) % devices.length);
        }, 15000);
        return () => clearInterval(interval);
    }, [devices.length]);
    // Ambil data dari Laravel
    useEffect(()=>{
        let isMounted = true;

        const fetchDashboard = async(showLoading = false)=>{
            try{
                if(showLoading){
                    setLoading(true);
                }
                const response = await api.get("/dashboard");
                if(isMounted){
                    console.log("Data Dashboard:", response.data);
                    setDashboard(response.data);
                    setError(null);
                }
            } catch(error){
                console.error("Gagal mengambil data dashboard:", error);
                if(isMounted){
                    setError("Gagal mengambil data dari server");   
                }
            } finally{
                if(isMounted && showLoading){
                    setLoading(false);
                }
            }
        };
        // ambil data pertama kali
        fetchDashboard(true);
        // update data setiap 5 detik
        const interval = setInterval(() => {
            fetchDashboard(false);
        }, 5000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        }
    },[]);
    // Loading
    if(loading){
        return(
            <div className="flex items-center justify-center h-full text-white">Memuat Data Dshboard</div>
        )
    }
    // Error
    if(error){
        return(
            <div className="flex items-center justify-center h-full text-red-500">{error}</div>
        )
    }
    // Data API
    const summary = dashboard.summary;
    const device = dashboard.device || [];
    const notifications = dashboard.notifications || [];
    const charts = dashboard.charts || {};
    // Cek Device
    if(device === 0){
        return(
            <div className="text-white">Belum ada data perangkat.</div>
        )
    }
    // kandang aktif/sedang ditampilkan
    const cage = devices[currentCage];

    return(
        <section id="dashboard" className="min-h-screen">
        <div className="space-y-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Monitoring kondisi perangkat sensor</p>
            <div className="grid grid-cols-3 gap-6 cursor-pointer">
                <StatsCard
                    title="Total Perangkat"
                    value={summary.total_devices}
                    subtitle={`${summary.online_devices} Perangkat Online`}
                    borderColor="#00E676"
                    backgroundColor="rgba(0,230,118,0.08)"
                    iconColor="#00E676"
                    icon={<Smartphone size={34}/>}
                />
                <StatsCard
                    title="Suhu"
                    value={cage.temperature !== null ? `${cage.temperature}°C` : "--"}
                    subtitle={`Suhu terakhir ${cage.device_name}`}
                    borderColor="#F59E0B"
                    backgroundColor="rgba(245,158,11,0.08)"
                    iconColor="#F59E0B"
                    icon={<Thermometer size={34}/>}
                />
                <StatsCard
                    title={`Status ${cage?.device_name || ""}`}
                    value={cage?.status === true ? "Online" : "Offline"}
                    subtitle="Status Perangkat"
                    borderColor={cage?.status === true? "#00E676" : "#EF4444"}
                    backgroundColor={cage?.status === true? "rgba(0,230,118,0.08)" : "rgba(239,68,68,0.08)"}
                    iconColor={cage?.status === true? "#00E676" : "EF4444"}
                    icon={<Activity size={34}/>}
                />
            </div>
            {/* Indikator Kandang Aktif */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-100 text-xl">Data card saat ini</p>
                    <p className="text-white font-semibold">{cage?.device_name}</p>
                </div>
                <div className="flex gap-2">
                    {devices.map((device, index) => (
                        <div 
                            key={device.id}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentCage ? "w-8 bg-[#00E676]" : "w-2 bg-[#293548]"}`}></div>
                    ))}
                </div>
            </div>
            {/* Notification */}
            <div>
                <NotificationPanel notifications={notifications}/>
            </div>
            {/* Grafik semua kandang */}
            <div className="space-y-3">
                <div>
                    <h2 className="text-xl font-semibold text-white">Monitoring Sensor</h2>
                    <p className="text-gray-300 text-sm mt-1">Grafik monitoring seluruh perangkat</p>
                </div>
                {/* Loop semua device */}
                {devices.map((device) =>(
                    <div
                        key={device.id}
                        className="w-full">
                            <MonitoringCards cage={device} chartData={charts[device.id] || []}/>
                        </div>
                ))}
            </div>
        </div>
        </section>
    )
}