<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TelegramService{
    protected string $botToken;
    protected string $chatId;

    public function __construct(){
        // Mengambil token bot dan chat ID dari config/services.php
        $this->botToken = config('services.telegram.bot_token');
        $this->chatId = config('services.telegram.chat_id');
    }
    // Kirim pesan Telegram.
    public function sendMessage(string $message): bool{
        $url = "https://api.telegram.org/bot{$this->botToken}/sendMessage";

        $response = Http::post($url,[
            'chat_id' => $this->chatId,
            'text' => $message,
            'parse_mode' => 'Markdown'
        ]);
        return $response->successful();
    }

    // Buat pesan monitoring berdasarkan data sensor
    public function sendMonitoringAlert(
        string $deviceName,
        float $temperature,
        float $humidity,
        string $status,
        string $message
    ) : bool {
        // membuat format pesan telegram
        $text = 
        "PERINGATAN MONITORING\n\n" .
        "*Perangkat:* {$deviceName}\n" .
        "*Suhu:*{$temperature}°C\n" .
        "*Kelembapan:* {$humidity}%\n" .
        "*Status:* {$status}\n" .
        "*Keterangan:* {$message}\n" .
        "*Waktu:*" . now()->format('d-m-Y H:i:s');

        // mengirim pesan melalui fungsi sendMessage()
        return $this->sendMessage($text);
    }
}