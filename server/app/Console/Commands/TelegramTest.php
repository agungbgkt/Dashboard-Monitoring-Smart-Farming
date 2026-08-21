<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\TelegramService;

class TelegramTest extends Command
{
    protected $signature = 'telegram:test';

    protected $description = 'Test mengirim pesan Telegram menggunakan akun pribadi';

    public function handle(TelegramService $telegram)
    {
        try {

            $this->info('Menghubungkan ke Telegram...');

            $message = "🚀 Test Smart Farming\n\n"
                . "TelegramService berhasil terhubung "
                . "dengan MadelineProto.\n\n"
                . "Pesan ini dikirim menggunakan "
                . "akun Telegram utama.";

            if ($telegram->sendMessage($message)) {

                $this->info(
                    '✅ Pesan berhasil dikirim ke @'
                    . config('services.telegram.target_username')
                );

                return self::SUCCESS;
            }

            $this->error(
                '❌ Pesan gagal dikirim ke Telegram.'
            );

            return self::FAILURE;

        } catch (\Throwable $e) {

            $this->error(
                '❌ Gagal mengirim pesan Telegram:'
            );

            $this->error(
                $e->getMessage()
            );

            return self::FAILURE;
        }
    }
}