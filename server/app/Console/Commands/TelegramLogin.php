<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use danog\MadelineProto\API;
use danog\MadelineProto\Settings;

class TelegramLogin extends Command
{
    protected $signature = 'telegram:login';

    protected $description = 'Login akun Telegram pribadi menggunakan MadelineProto';

    public function handle()
    {
        $sessionPath = storage_path(
            'app/telegram/session.madeline'
        );

        // Pastikan folder tersedia
        if (!is_dir(dirname($sessionPath))) {
            mkdir(
                dirname($sessionPath),
                0755,
                true
            );
        }

        $settings = new Settings;

        $settings->getAppInfo()
            ->setApiId(
                (int) config('services.telegram.api_id')
            )
            ->setApiHash(
                config('services.telegram.api_hash')
            );

        $this->info('Memulai login Telegram...');
        $this->info('Gunakan AKUN TELEGRAM UTAMA kamu sebagai pengirim.');

        try {

            $telegram = new API(
                $sessionPath,
                $settings
            );

            $telegram->start();

            $this->info('✅ Login Telegram berhasil!');
            $this->info(
                'Session tersimpan di: ' . $sessionPath
            );

            return self::SUCCESS;

        } catch (\Throwable $e) {

            $this->error(
                '❌ Login Telegram gagal:'
            );

            $this->error(
                $e->getMessage()
            );

            return self::FAILURE;
        }
    }
}