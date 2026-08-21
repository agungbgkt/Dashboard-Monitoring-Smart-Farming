<?php

namespace App\Services;

use danog\MadelineProto\API;
use danog\MadelineProto\Settings;
use Illuminate\Support\Facades\Log;

class TelegramService{
    protected ?API $telegram = null;
    private function getTelegram(): API{
        if ($this->telegram !== null) {
            return $this->telegram;
        }
        $sessionPath = storage_path(
            'app/telegram/session.madeline'
        );
        $settings = new Settings;
        $settings->getAppInfo()
            ->setApiId(
                (int) config('services.telegram.api_id')
            )
            ->setApiHash(
                config('services.telegram.api_hash')
            );
        $this->telegram = new API(
            $sessionPath,
            $settings
        );

        return $this->telegram;
    }

    public function sendMessage(string $message): bool{
        try {
            $username = config('services.telegram.target_username');
            if (!$username) {
                throw new \RuntimeException(
                    'TELEGRAM_TARGET_USERNAME belum dikonfigurasi.'
                );
            }
            $telegram = $this->getTelegram();
            $telegram->messages->sendMessage([
                'peer' => $username,
                'message' => $message,
            ]);

            Log::info(
                'Telegram message berhasil dikirim',
                ['target' => $username,]
            );

            return true;

        } catch (\Throwable $e) {

            Log::error(
                'Telegram message gagal dikirim',
                [
                    'target' => $username ?? null,
                    'error' => $e->getMessage(),
                ]
            );

            return false;
        }
    }
}