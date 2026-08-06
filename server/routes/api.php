<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\DeviceController;
use App\Http\Controllers\api\MonitoringLogController;
use App\Http\Controllers\api\NotificationLogController;
use App\Services\TelegramService;

// Device API
Route::apiResource('devices', DeviceController::class);
// Monitoring API
Route::get('monitoring-logs/latest', [MonitoringLogController::class, 'latest']);
Route::apiResource('monitoring-logs', MonitoringLogController::class);
// data monitoring terbaru
Route::get('monitoring-logs/chart', [MonitoringLogController::class, 'chart']);
Route::get('monitoring-logs/statistics', [MonitoringLogController::class, 'statistics']);
// Notification API
Route::get('notification-logs/latest', [NotificationLogController::class, 'latest']);
Route::get('notification-logs/statistics', [NotificationLogController::class, 'statistics']);
Route::delete('notification-logs', [NotificationLogController::class, 'clear']);
Route::apiResource('notification-logs', NotificationLogController::class)
    ->only(['index', 'show', 'destroy']);
// Telegram
Route::get('/test-telegram', function(TelegramService $telegram){
    $result = $telegram->sendMessage(
        "✅ Telegram berhasil terhubung dengan Laravel.\n\n" .
        "Waktu: " . now()
    );
    return response()->json([
        'success' => $result
    ]);
});
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
