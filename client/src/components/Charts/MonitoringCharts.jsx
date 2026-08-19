import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import { Thermometer, ChevronDown } from "lucide-react";

export default function MonitoringCards({
    cage,
    chartData = [],
}) {

    return (
        <div className="bg-[#111827] border border-[#293548] rounded-2xl p-6">

            {/* =====================================================
                HEADER
            ====================================================== */}

            <div className="mb-6">

                {/* Nama kandang */}

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center">
                        <Thermometer
                            size={22}
                            className="text-orange-400"
                        />
                    </div>

                    <div>

                        <h2 className="text-white text-xl font-semibold">
                            Suhu
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                            {cage?.device_name || "Perangkat"}
                        </p>

                    </div>

                </div>


                {/* =================================================
                    FILTER WAKTU
                ================================================== */}

                <div className="mt-5">

                    <label className="block text-gray-400 text-sm mb-2">
                        Periode
                    </label>

                    <div className="relative w-fit">

                        <select
                            className="
                                appearance-none
                                bg-[#172133]
                                border border-[#293548]
                                rounded-lg
                                px-4
                                py-2.5
                                pr-10
                                text-white
                                text-sm
                                outline-none
                                cursor-pointer
                                hover:border-[#3B4A60]
                                focus:border-[#00E676]
                                transition
                            "
                        >
                            <option value="today">
                                Hari Ini
                            </option>

                            <option value="7days">
                                7 Hari
                            </option>

                            <option value="30days">
                                30 Hari
                            </option>

                        </select>

                        <ChevronDown
                            size={17}
                            className="
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                                pointer-events-none
                            "
                        />

                    </div>

                </div>

            </div>


            {/* =====================================================
                GARIS PEMISAH
            ====================================================== */}

            <div className="border-t border-[#293548] mb-6" />


            {/* =====================================================
                CHART
            ====================================================== */}

            {chartData.length === 0 ? (

                <div className="h-[340px] flex items-center justify-center text-gray-400">

                    <div className="text-center">

                        <Thermometer
                            size={36}
                            className="mx-auto mb-3 text-gray-600"
                        />

                        <p>
                            Belum ada data grafik
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                            Data sensor akan muncul setelah perangkat mengirim data.
                        </p>

                    </div>

                </div>

            ) : (

                <div className="w-full h-[380px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 10,
                            }}
                        >

                            <CartesianGrid
                                stroke="#293548"
                                strokeDasharray="5 5"
                            />

                            <XAxis
                                dataKey="time"
                                stroke="#94A3B8"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                            />

                            <YAxis
                                stroke="#94A3B8"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    background: "#111827",
                                    border: "1px solid #293548",
                                    borderRadius: "12px",
                                    color: "#fff",
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="temperature"
                                stroke="#00E676"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{
                                    r: 6,
                                }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>
    );
}