<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\NotificationLog;

class NotificationLogController extends Controller
{
    // Menampilkan seluruh histori notifikasi
    public function index(Request $request){
        $query = NotificationLog::with('device');

        // Filter status
        if($request->filled('status')){
            $query->where('status', $request->status);
        }
        // Filter device
        if($request->filled('device_id')){
            $query->where('device_id', $request->device_id);
        }
        // Filter device
        if($request->filled('start_date')){
            $query->where('start_date', $request->start_date);
        }
        if($request->filled('end_date')){
            $query->whereDate('send_at', '<=', $request->end_date);
        }

        $notifications = $query
            ->orderByDesc('send_at')
            ->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'message' => 'Data notifikasi berhasil dikirim.',
            'data' => $notifications
        ], 200);
    }

    // Detail norifikasi
    public function show($id){
        $notification = NotificationLog::with('device')->find($id);
        if(!$notification){
            return response()->json([
                'success' => false,
                'message' => 'Data notifikasi tidak ditemukan.'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $notification
        ], 200);
    }

    // Notification terbaru
    public function latest(){
        $notification = NotificationLog::with('device')
            ->latest('send_at')
            ->first();
        
        return response()->json([
            'success' => true,
            'data' => $notification
        ], 200);
    }

    // Statistik notifikasi
    public function statistics(){
        return response()->json([
            'success' => true,
            'data' => [
                'total_notifications' => NotificationLog::count(),
                'normal' => NotificationLog::where('status', 'NORMAL')->count(),
                'temperature_high' => NotificationLog::where('status', 'SUHU TINGGI')->count(),
                'temperature_low' => NotificationLog::where('status', 'SUHU RENDAH')->count(),
                'humidity_high' => NotificationLog::where('status', 'KELEMBAPAN TINGGI')->count(),
                'humidity_low' => NotificationLog::where('status', 'KELEMBAPAN RENDAH')->count()
            ]
        ],200);
    }

    // Hapus satu notifikasi
    public function destroy($id){
        $notification = NotificationLog::find($id);

        if(!$notification){
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        }
        $notification->delete();
        return response()->json([
            'success' => true,
            'message' => 'Notifikasi berhasil dihapus'
        ], 200);
    }

    // Hapus seluruh histori notifikasi
    public function clear(){
        NotificationLog::truncate();

        return response()->json([
            'success' => true,
            'message' => 'Seluruh histori notifikasi berhasil dihapus.'
        ], 200);
    }
}
