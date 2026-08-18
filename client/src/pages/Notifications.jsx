import { useEffect, useState } from "react";
import api from "../api/api";
import {
    Bell,
    CheckCircle,
    AlertTriangle,
    Thermometer,
    Droplets,
} from "lucide-react";

export default function Notification() {
    // Menyimpan daftar notifikasi dari API
    const [notifications, setNotifications] = useState([]);
    // Menyimpan statistik notifikasi
    const [statistics, setStatistics] = useState(null);
    // Status loading
    const [loading, setLoading] = useState(true);
    // Menyimpan pesan error
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchNotificationData = async () => {
            try {
                setLoading(true);
                setError(null);
                // Ambil histori notifikasi
                const notificationResponse =
                    await api.get("/notification-logs", {
                        params: {
                            per_page: 20,
                        },
                    });

                console.log(
                    "Notification:",
                    notificationResponse.data);
                setNotifications(
                    notificationResponse.data.data?.data || []);
                // Ambil statistik
                const statisticsResponse =
                    await api.get("/notification-logs/statistics");

                console.log(
                    "Notification Statistics:",
                    statisticsResponse.data
                );
                setStatistics(
                    statisticsResponse.data.data
                );
            } catch (error) {
                console.error(
                    "Gagal mengambil data notifikasi:",
                    error
                );
                setError(
                    "Gagal mengambil data notifikasi"
                );
            } finally {

                setLoading(false);

            }
        };

        fetchNotificationData();

    }, []);

    const getStatusStyle = (status) => {
    if (status === "success") {
        return "bg-green-500/10 text-green-400";
    }

    if (
        status === "SUHU TINGGI" ||
        status === "SUHU RENDAH" ||
        status === "KELEMBAPAN TINGGI" ||
        status === "KELEMBAPAN RENDAH"
    ) {
        return "bg-red-500/10 text-red-400";
    }

    return "bg-gray-500/10 text-gray-400";
    };

    // Loading
    if (loading) {
        return (
            <div className="text-gray-400">
                Memuat data notifikasi...
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="text-red-400">
                {error}
            </div>
        );
    }

    return (
        <section className="min-h-screen">

            <div className="space-y-8">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Notifikasi
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Riwayat dan status notifikasi sistem
                    </p>
                </div>


                {/* STATISTICS */}
                <div className="grid grid-cols-3 gap-6">

                    {/* Total */}
                    <div className="bg-[#111827] border border-[#293548] rounded-2xl p-6">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-gray-400 text-sm">
                                    Total Notifikasi
                                </p>

                                <h2 className="text-3xl font-bold text-white mt-2">
                                    {statistics?.total_notifications ?? 0}
                                </h2>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center text-[#00E676]">
                                <Bell size={24} />
                            </div>

                        </div>

                    </div>


                    {/* Normal */}
                    <div className="bg-[#111827] border border-[#293548] rounded-2xl p-6">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-gray-400 text-sm">
                                    Normal
                                </p>

                                <h2 className="text-3xl font-bold text-white mt-2">
                                    {statistics?.normal ?? 0}
                                </h2>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                                <CheckCircle size={24} />
                            </div>

                        </div>

                    </div>


                    {/* Peringatan */}
                    <div className="bg-[#111827] border border-[#293548] rounded-2xl p-6">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-gray-400 text-sm">
                                    Peringatan
                                </p>

                                <h2 className="text-3xl font-bold text-white mt-2">
                                    {
                                        (statistics?.temperature_high ?? 0) +
                                        (statistics?.temperature_low ?? 0) +
                                        (statistics?.humidity_high ?? 0) +
                                        (statistics?.humidity_low ?? 0)
                                    }
                                </h2>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                                <AlertTriangle size={24} />
                            </div>

                        </div>

                    </div>

                </div>


                {/* TABLE */}
                <div className="bg-[#111827] border border-[#293548] rounded-2xl p-6">

                    <div className="mb-6">

                        <h2 className="text-xl font-semibold text-white">
                            Riwayat Notifikasi
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                            Seluruh riwayat notifikasi monitoring
                        </p>

                    </div>


                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-[#293548] text-left">

                                    <th className="py-4 px-4 text-gray-400 font-medium">
                                        Waktu
                                    </th>

                                    <th className="py-4 px-4 text-gray-400 font-medium">
                                        Perangkat
                                    </th>

                                    <th className="py-4 px-4 text-gray-400 font-medium">
                                        Suhu
                                    </th>

                                    <th className="py-4 px-4 text-gray-400 font-medium">
                                        Kelembapan
                                    </th>

                                    <th className="py-4 px-4 text-gray-400 font-medium">
                                        Status
                                    </th>

                                    <th className="py-4 px-4 text-gray-400 font-medium">
                                        Keterangan
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {notifications.map((notification) => (

                                    <tr
                                        key={notification.id}
                                        className="border-b border-[#293548] hover:bg-[#172133] transition"
                                    >

                                        <td className="py-4 px-4 text-gray-400">
                                            {new Date(
                                                notification.send_at
                                            ).toLocaleString("id-ID")}
                                        </td>


                                        <td className="py-4 px-4">

                                            <p className="text-white font-medium">
                                                {notification.device?.device_name ?? "-"}
                                            </p>

                                        </td>


                                        <td className="py-4 px-4 text-gray-300">
                                            {notification.temperature} °C
                                        </td>


                                        <td className="py-4 px-4 text-gray-300">
                                            {notification.humidity} %
                                        </td>


                                        <td className="py-4 px-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                                                    notification.status
                                                )}`}
                                            >
                                                {notification.status}
                                            </span>

                                        </td>


                                        <td className="py-4 px-4 text-gray-400">
                                            {notification.message}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </section>
    );
}