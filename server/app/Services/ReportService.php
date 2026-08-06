<?php

 namespace App\Services;

 use App\Models\Device;
 use App\Models\MonitoringLog;

 class ReportService{
    // Mengambil data monitoring terbaru dari setiap device. // return array.
    public function generateReportData(): array{
        $devices = Device::all();
        $reports = [];

        foreach($devices as $device){
            $latest = MonitoringLog::where('device_id', $device->id)
                ->latest('recorded_at')
                ->first();

            if(!$latest){
                continue;
            }

            $reports[] = [
                'device_id' => $device->id,
                'device_name' => $device->device_name,
                'temperature' => $latest->temperature,
                'humidity' => $latest->humidity,
                'recorded_at' => $latest->recorded_at,
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