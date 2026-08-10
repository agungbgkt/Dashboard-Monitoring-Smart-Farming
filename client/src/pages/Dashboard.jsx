import StatsCard from "../components/Cards/StatsCard";
import {Home, Thermometer, Droplets, Activity, Smartphone} from "lucide-react";
import MonitoringCards from "../components/Charts/MonitoringCharts";
import NotificationPanel from "../components/Cards/NotificationPanel";
import { useState, useEffect } from "react";

export default function Dashboard(){
    // Data Dummy
    const cages = [
    {
        id : 1,
        name: "Kandang 1",
        temperature: "31.5°C",
        kelembapan: "70%",
    },
    {
        id : 2,
        name: "Kandang 2",
        temperature: "31.1°C",
        kelembapan: "72%",
    },
    {
        id : 3,
        name: "Kandang 3",
        temperature: "31.4°C",
        kelembapan: "71%",
    },
    {
        id : 4,
        name: "Kandang 4",
        temperature: "31.6°C",
        kelembapan: "69%",
    },
    {
        id : 5,
        name: "Kandang 5",
        temperature: "31.5°C",
        kelembapan: "70%",
    },
    {
        id : 6,
        name: "Kandang 6",
        temperature: "31.9°C",
        kelembapan: "74%",
    },
    ];
    // State
    const [currentCage, setCurrentCage] = useState(0);
    // Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCage((prev) => (prev + 1) % cages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    // kandang aktif/sedang ditampilkan
    const cage = cages[currentCage];

    return(
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <div className="grid grid-cols-3 gap-6 cursor-pointer">
                <StatsCard
                    title="Total Perangkat"
                    value="6"
                    subtitle="Perangkat Online"
                    borderColor="#00E676"
                    backgroundColor="rgba(0,230,118,0.08)"
                    iconColor="#00E676"
                    icon={<Smartphone size={34}/>}
                />
                <StatsCard
                    title="Suhu"
                    value={`${cage.temperature}`}
                    subtitle={`Suhu terakhir ${cage.name}`}
                    borderColor="#F59E0B"
                    backgroundColor="rgba(245,158,11,0.08)"
                    iconColor="#F59E0B"
                    icon={<Thermometer size={34}/>}
                />
                <StatsCard
                    title="Status"
                    value="Running"
                    subtitle="Update Terbaru 12:00:55"
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
                    <MonitoringCards cage={cage}/>
                </div>
                {/* Notification */}
                <div className="col-span-1">
                    <NotificationPanel/>
                </div>
            </div>
        </div>
    )
}