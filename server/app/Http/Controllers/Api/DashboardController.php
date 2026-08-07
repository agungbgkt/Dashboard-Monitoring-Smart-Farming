<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Device;
use App\Models\MonitoringLog;
use App\Models\NotificationLog;

class DashboardController extends Controller
{
    public function index(){
        // Total Perangkat
        $totalDevice = Device::count();
        // Perangkat Online
        $onlineDevices = Device::where('status', true)->count();
        // Ambil data monitoring TERBARU dari setiap device
        $devices = Device::with([
            'monitoringLogs' => function($query){
                $query->latest('recorded_at')->limit(1);
            }
        ])->get();
        // Format data device
        $deviceData = $devices->map(function($device){
            $latest = $device->monitoringLogs->first();
            return[
                'id' => $device->id,
                'device_name' =>$device->device_name,
                'device_code' =>$device->device_code,
                'status' =>$device->status,
                'location' =>$device->location,

                'temperature' =>$latest?->temperature,
                'humidity' =>$latest?->humidity,
                'recorded_at' =>$latest?->recorded_at,
            ];
        });
        // Data grafik setiap device  (24 jam terakhir)
        $charts = [];
        foreach ($devices as $device){
            $charts[$device->id] = MonitoringLog::where('device_id', $device->id)
                ->orderBy('recorded_at', 'desc')
                ->take(24)
                ->get()
                ->reverse()
                ->values()
                ->map(function ($item){
                    return[
                        'time' =>optional($item->recorded_at)->format('H:i'),
                        'temperature' =>$item->temperature,
                        'humidity' =>$item->humidity,
                    ];
                });
        }
        // 10 notifikasi terakhir
        $notifications = NotificationLog::with('device')
            ->latest('send_at')
            ->take(10)
            ->get();

        return response()->json([
            "summary" => [
                "total_devices"=>$totalDevice,
                "online_devices"=>$onlineDevices,
                "system_status"=>"Running"
            ],
            "devices"=>$deviceData,
            "charts"=>$charts,
            "notifications"=>$notifications
        ]);
    }
}
