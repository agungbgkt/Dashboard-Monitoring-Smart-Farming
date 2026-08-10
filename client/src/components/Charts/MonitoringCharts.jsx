import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, } from "recharts";
import { Thermometer, Droplets, ChevronDown } from "lucide-react";

export default function MonitoringCards({cage}){
    const chartData = {
    1: [
        { time: "08:00", temperature: 29, humidity: 74 },
        { time: "09:00", temperature: 30, humidity: 73 },
        { time: "10:00", temperature: 31, humidity: 71 },
        { time: "11:00", temperature: 32, humidity: 70 },
        { time: "12:00", temperature: 31, humidity: 72 },
    ],
    2: [
        { time: "08:00", temperature: 28, humidity: 78 },
        { time: "09:00", temperature: 29, humidity: 76 },
        { time: "10:00", temperature: 30, humidity: 75 },
        { time: "11:00", temperature: 31, humidity: 73 },
        { time: "12:00", temperature: 30, humidity: 74 },
    ],
    3: [
        { time: "08:00", temperature: 31, humidity: 70 },
        { time: "09:00", temperature: 32, humidity: 68 },
        { time: "10:00", temperature: 33, humidity: 67 },
        { time: "11:00", temperature: 34, humidity: 66 },
        { time: "12:00", temperature: 33, humidity: 68 },
    ],
    4: [
        { time: "08:00", temperature: 27, humidity: 80 },
        { time: "09:00", temperature: 28, humidity: 79 },
        { time: "10:00", temperature: 29, humidity: 77 },
        { time: "11:00", temperature: 30, humidity: 75 },
        { time: "12:00", temperature: 31, humidity: 74 },
    ],
    5: [
        { time: "08:00", temperature: 31, humidity: 70 },
        { time: "09:00", temperature: 32, humidity: 68 },
        { time: "10:00", temperature: 33, humidity: 67 },
        { time: "11:00", temperature: 34, humidity: 66 },
        { time: "12:00", temperature: 33, humidity: 68 },
    ],
    6: [
        { time: "08:00", temperature: 28, humidity: 78 },
        { time: "09:00", temperature: 29, humidity: 76 },
        { time: "10:00", temperature: 30, humidity: 75 },
        { time: "11:00", temperature: 31, humidity: 73 },
        { time: "12:00", temperature: 30, humidity: 74 },
    ],
    };
    const data = chartData[cage.id];
    const [chartType, setChartType] = useState("temperature");
    const isTemperature = chartType === "temperature";

    return(
        <div className="bg-[#111827] border border-[#293548] rounded-2xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    {isTemperature ? <Thermometer size={24} className="text-orange-400"/> : <Droplets size={24} className="text-blue-400"/>}
                    <h2 className="text-white text-xl font-semibold">
                        {isTemperature ? `Suhu (${cage.name})` : `Kelembapan (${cage.name})`}
                    </h2>
                </div>
                <div className="flex gap-3">
                    {/* Pilih Sensor */}
                    <div className="relative">
                        <select
                            value={chartType}
                            onChange={(e) => setChartType(e.target.value)}
                            className="appearance-none bg-[#172133] border border-[#293548] rounded-lg px-4 py-2 pr-10 text-white cursor-pointer outline-none"
                        >
                            <option value="temperature">Suhu</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-3 top-3 text-gray-400"/>
                    </div>
                    {/* Filter Waktu */}
                    <select className="bg-[#172133] border border-[#293548] rounded-lg px-4 py-2 text-white outline-none">
                        <option>Hari Ini</option>
                        <option>7 Hari</option>
                        <option>30 Hari</option>
                    </select>
                </div>
            </div>
            // Chart
            <ResponsiveContainer width="100%" height={340}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#293548" strokeDasharray="5 5"/>
                    <XAxis dataKey="time" stroke="#94A3B8"/>
                    <YAxis stroke="#94A3B8"/>
                    <Tooltip contentStyle={{background: "#111827", border: "1px solid #293548", borderRadius: "12px", color: "#fff",}}/>
                    <Line type="monotone" dataKey={isTemperature ? "temperature" : "humidity"} stroke={isTemperature ? "#00E676" : "#3B82F6"} strokeWidth={3} dot={false} activeDot={{r:6,}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}