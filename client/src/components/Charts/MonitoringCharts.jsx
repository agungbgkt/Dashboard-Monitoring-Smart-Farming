import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, } from "recharts";
import { Thermometer, Droplets, ChevronDown } from "lucide-react";

export default function MonitoringCards({cage, chartData = []}){

    return(
        <div className="bg-[#111827] border border-[#293548] rounded-2xl p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <Thermometer size={24} className="text-orange-400"/>
                    <h2 className="text-white text-xl font-semibold">
                        Suhu({cage?.device_name})
                    </h2>
                </div>
                 <div className="flex gap-3">
                    {/* Pilih Sensor */}
                    {/* <div className="relative"> */}
                        {/* <select
                            value={chartType}
                            onChange={(e) => setChartType(e.target.value)}
                            className="appearance-none bg-[#172133] border border-[#293548] rounded-lg px-4 py-2 pr-10 text-white cursor-pointer outline-none"
                        >
                            <option value="temperature">Suhu</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-3 top-3 text-gray-400"/> */}
                    {/* </div> */}
                    {/* Filter Waktu */}
                    <div className="relative">
                        <select className="bg-[#172133] border border-[#293548] rounded-lg px-2 py-2 text-white outline-none">
                            <option>Hari Ini</option>
                            <option>7 Hari</option>
                            <option>30 Hari</option>
                        </select>
                    </div>
                </div>
                {/* jika belum ada data */}
                {chartData.length === 0 ? (
                    <div className="h-[340px] flex items-center justify-center text-gray-400">
                    Belum ada data grafik
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={340}>
                        <LineChart data={chartData}>
                            <CartesianGrid stroke="#293548" strokeDasharray="5 5"/>
                            <XAxis dataKey="time" stroke="#94A3B8"/>
                            <YAxis stroke="#94A3B8"/>
                            <Tooltip contentStyle={{background: "#111827", border: "1px solid #293548", borderRadius: "12px", color: "#fff",}}/>
                            <Line type="monotone" dataKey="temperature" stroke="#00E676" strokeWidth={3} dot={false} activeDot={{r:6,}}/>
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
            {/* Chart */}
            {/* <ResponsiveContainer width="100%" height={340}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#293548" strokeDasharray="5 5"/>
                    <XAxis dataKey="time" stroke="#94A3B8"/>
                    <YAxis stroke="#94A3B8"/>
                    <Tooltip contentStyle={{background: "#111827", border: "1px solid #293548", borderRadius: "12px", color: "#fff",}}/>
                    <Line type="monotone" dataKey={isTemperature ? "temperature" : "humidity"} stroke={isTemperature ? "#00E676" : "#3B82F6"} strokeWidth={3} dot={false} activeDot={{r:6,}}/>
                </LineChart>
            </ResponsiveContainer> */}
        </div>
    )
}