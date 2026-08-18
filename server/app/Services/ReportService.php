<?php

 namespace App\Services;

 use App\Models\Device;
 use App\Models\MonitoringLog;
 use App\Models\Setting;

 class ReportService{
    // Mengambil data monitoring terbaru dari setiap device. // return array.
    public function generateReportData(): array{
        $devices = Device::all();
        // Mengambil konfigurasi batas sensor
        $setting = Setting::first();
        $reports = [];

        foreach($devices as $device){
            // Cari data monitoring terbaru dari perangkat ini
            $latest = MonitoringLog::where('device_id', $device->id)
                ->latest('recorded_at')
                ->first();

            // Kalau perangkat belum punya data monitoring,
            // lanjut ke perangkat berikutnya.
            if(!$latest){
                continue;
            }
            
            // default kondisi
            $status = 'NORMAL';
            $statusMessage = 'Kondisi monitoring normal.';

            if ($setting){
                if ($latest->temperature > $setting->temperature_max){
                    $status = 'SUHU TINGGI';
                     $statusMessage =
                        "Suhu {$latest->temperature}°C melebihi batas " .
                        "{$setting->temperature_max}°C.";
                } elseif ($latest->temperature < $setting->temperature_min){
                    $status = 'SUHU RENDAH';
                     $statusMessage =
                        "Suhu {$latest->temperature}°C dibawah batas " .
                        "{$setting->temperature_min}°C.";
                } elseif($latest-> humidity > $setting->humidity_max){
                    $status = 'KELEMBAPAN TINGGI';
                    $statusMessage =
                        "Kelembapan {$latest->humidity}% melebihi batas " .
                        "{$setting->humidity_max}%.";
                } elseif($latest-> humidity < $setting->humidity_min){
                    $status = 'KELEMBAPAN RENDAH';
                    $statusMessage =
                        "Kelembapan {$latest->humidity}% dibawah batas " .
                        "{$setting->humidity_min}%.";
                }
            }

            $reports[] = [
                'device_id' => $device->id,
                'device_name' => $device->device_name,
                'temperature' => $latest->temperature,
                'humidity' => $latest->humidity,
                'recorded_at' => $latest->recorded_at,
                'status' => $status,
                'status_message' => $statusMessage,
            ];
        }
        return $reports;
    }

    // Membuat format pesan Telegram / Whatsapp. // @return String.
    public function generateReportMessage(array $report): string{
        // $data = $this->generateReportData();
        $message = "SMART FARMING REPORT\n";
        $message .= "🕒" . now()->format('d-m-Y H:i') . "\n\n";

        // if(empty($data)){
        //     return $message . "Belum ada data monitoring.";
        // }

        // foreach($data as $item){
            $message .= "📍 *{$report['device_name']}*\n";
            $message .= "🌡 Suhu : {$report['temperature']} °C\n";
            $message .= "💧 Kelembapan : {$report['humidity']} %\n";
            $message .= "📅 Data Sensor : {$report['recorded_at']}\n\n";
        // }
        return $message;
    }
 }