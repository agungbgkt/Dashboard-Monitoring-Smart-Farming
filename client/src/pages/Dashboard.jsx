import StatsCard from "../components/Cards/StatsCard";
import {Home, Thermometer, Droplets, Activity, Smartphone} from "lucide-react";
import MonitoringCards from "../components/Charts/MonitoringCharts";
import NotificationPanel from "../components/Cards/NotificationPanel";
import { useState, useEffect } from "react";
import api from "../api/api";

export default function Dashboard(){
    // Data Dummy
    // const cages = [
    // {
    //     id : 1,
    //     name: "Kandang 1",
    //     temperature: "31.5°C",
    //     kelembapan: "70%",
    // },
    // {
    //     id : 2,
    //     name: "Kandang 2",
    //     temperature: "31.1°C",
    //     kelembapan: "72%",
    // },
    // {
    //     id : 3,
    //     name: "Kandang 3",
    //     temperature: "31.4°C",
    //     kelembapan: "71%",
    // },
    // ];
    // State
    const [dashboard, setDashboard] = useState(null);
    const [currentCage, setCurrentCage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Data dari API
    const devices = dashboard?.devices || [];
    // Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCage((prev) => (prev + 1) % devices.length);
        }, 15000);
        return () => clearInterval(interval);
    }, [devices.length]);
    // Ambil data dari Laravel
    useEffect(()=>{
        const fetchDashboard = async()=>{
            try{
                const response = await api.get("/dashboard");
                console.log("Data Dashboard:", response.data);
                setDashboard(response.data);
            } catch(error){
                console.error("Gagal mengambil data dashboard:", error);
                setError("Gagal mengambil data dari server");
            } finally{
                setLoading(false);
            }
        };
        fetchDashboard();
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
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
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
                    title="Status"
                    value={summary.system_status}
                    subtitle="Status sistem monitoring"
                    borderColor="#00E676"
                    backgroundColor="rgba(0,230,118,0.08)"
                    iconColor="#00E676"
                    icon={<Activity size={34}/>}
                />
            </div>
            {/* Chart + Notification */}
            <div className="grid grid-cols-3 gap-6 mt-6">
                {/* Chart */}
                <div className="col-span-2">
                    <MonitoringCards cage={cage} chartData={charts[cage.id] || []}/>
                </div>
                {/* Notification */}
                <div className="col-span-1">
                    <NotificationPanel notifications={notifications}/>
                </div>
            </div>
        </div>
        </section>
    )
}