<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MonitoringLog;
use App\Models\Device;
use App\Models\NotificationLog;
use App\Models\Setting;
use Illuminate\Http\Request;

class MonitoringLogController extends Controller
{
    // History monitoring // GET /api/monitoring-logs
    public function index(Request $request){
        $query = MonitoringLog::with('device');
        // Filter device
        if($request->filled('device_id')){
            $query->where('device_id', $request->device_id);
        }
        // Filter tanggal selesai
        if($request->filled('end_date')){
            $query->whereDate('recorded_at', '<=', $request->end_date);
        }

        $logs = $query
            ->orderByDesc('recorded_at')
            ->paginate($request->get('per_page',20));
        
        return response()->json([
            'success' => true,
            'message' => 'Data monitoring berhasil diambil.',
            'data' => $logs
        ]);
    }

    // Simpan data dari ESP32 // POST /api/monitoring-logs
    public function store(Request $request){

        $validated = $request->validate([
            'device_id' => 'required|exists:devices,id',
            'temperature' => 'required|numeric',
            'humidity' => 'required|numeric',
            'recorded_at' => 'nullable|date'
        ]);

        $validated['recorded_at'] = $validated['recorded_at'] ?? now();
        // Simpan monitoring
        $monitoring = MonitoringLog::create($validated);
        // Ambil setting
        $setting = Setting::first();
        $status = 'NORMAL';
        $message = 'Monitoring normal';

        if($setting){
            if ($validated['temperature'] > $setting->temperature_max){
                $status = "SUHU TINGGI";
                $message = "Suhu {$validated['temperature']}°C melebihi batas {$setting->temperature_max}°C";
            } elseif($validated['temperature'] < $setting->temperature_min){
                $status = "SUHU RENDAH";
                $message = "Suhu {$validated['temperature']}°C di bawah {$setting->temperature_min}°C";
            }
            if($validated['humidity'] > $setting->humidity_max){
                $status = "KELEMBAPAN TINGGI";
                $message = "Kelembapan {$validated['humidity']}% melebihi batas {$setting->humidity_max}%";
            } elseif($validated['humidity'] < $setting->humidity_min){
                $status = "KELEMBAPAN RENDAH";
                $message = "Kelembapan {$validated['humidity']}% dibawah {$setting->humidity_min}%";
            }
        }

        NotificationLog::create([
            'device_id' => $validated['device_id'],
            'temperature' => $validated['temperature'],
            'humidity' => $validated['humidity'],
            'message' => $message,
            'send_at' => now(),
            'status' => $status
        ]);

        /*
        =============================
        Tempat Kirim Telegram
        =============================
        if($setting->telegram_enable){
            ...
        }
        =============================
        Tempat Kirim WhatsApp
        =============================
        if($setting->whatsapp_enable){
            ...
        }
        */

        return response()->json([
            'success' => true,
            'message' => 'Data monitoring berhasil disimpan.',
            'data' => $monitoring
        ]);
    }
    
    // Detail monitoring // GET /api/monitoring-logs/{id}
    public function show($id){
        $log = MonitoringLog::with('device')->find($id);
        if(!$log){
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $log
        ]);
    }

    // Update monitoring
    public function update(Request $request, $id){
        $log = MonitoringLog::find($id);
        if(!$log){
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        }

        $validated = $request->validate([
            'device_id' => 'required|exist:devices,id',
            'temperature' => 'required|numeric',
            'humidity' => 'required|numeric',
            'recorded_at' => 'nullable|date'
        ]);

        $log->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data berhasil diperbarui.',
            'data' => $log
        ]);
    }

    // Hapus monitoring
    public function destroy($id){
        $log = MonitoringLog::find($id);
        if(!$log){
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        }
        $log->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus.'
        ]);
    }

    // Data monitoring terbaru // GET /api/monitoring-logs/latest
    public function latest(){
        $latest = MonitoringLog::with('device')
            ->latest('recorded_at')
            ->first();
        
        return response()->json([
            'success' => true,
            'data' => $latest
        ]);
    }

    // Data grafik GET /api/monitoring-logs/chart
    public function chart(){
        $chart = MonitoringLog::select(
            'device_id',
            'temperature',
            'humidity',
            'recorded_at'
        )
        ->orderBy('recorded_at', 'asc')
        ->get()
        ->groupBy('device_id')
        ->map(function ($logs) {
            return $logs->map(function($log){
                return[
                    'time'=>$log->recorded_at->format('H:i'),
                    'temperature'=>$log->temperature,
                    'humidity'=>$log->humidity,
                ];
            });
        });

        return response()->json([
            'success' => true,
            'data' => $chart
        ]);
    }

    // Statistik dashboard // GET /api/monitoring-logs/statistics
    public function statistics(){
        return response()->json([
            'success' => true,
            'data' => [
                'total_devices' => Device::count(),
                'total_monitoring' => MonitoringLog::count(),
                'total_notifications' => NotificationLog::count(),
                'latest_temperature' => MonitoringLog::latest('recorded_at')->value('temperature'),
                'latest_humidity' => MonitoringLog::latest('recorded_at')->value('humidity'),
                'latest_update' => MonitoringLog::latest('recorded_at')->value('recorded_at')
            ]
        ]);
    }
}
