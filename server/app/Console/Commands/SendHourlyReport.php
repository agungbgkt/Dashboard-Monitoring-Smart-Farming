<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ReportService;
use App\Services\TelegramService;
use App\Models\NotificationLog;

class SendHourlyReport extends Command
{
    protected $signature = 'report:hourly';

    protected $description = 'Mengirim laporan monitoring terbaru setiap jam ke Telegram';

    protected ReportService $reportService;
    protected TelegramService $telegramService;

    public function __construct(
        ReportService $reportService,
        TelegramService $telegramService
    ) {
        parent::__construct();

        $this->reportService = $reportService;
        $this->telegramService = $telegramService;
    }

    public function handle(): int
    {
        try {

            $reports = $this->reportService->generateReportData();

            if (empty($reports)) {
                $this->warn('Belum ada data monitoring.');

                return Command::SUCCESS;
            }

            foreach ($reports as $report) {

                $message = $this->reportService->generateReportMessage($report);

                $success = $this->telegramService->sendMessage($message);

                NotificationLog::create([
                    'device_id'   => $report['device_id'],
                    'temperature' => $report['temperature'],
                    'humidity'    => $report['humidity'],
                    'message'     => $message,
                    'send_at'     => now(),
                    'status'      => $report['status'],
                ]);

                if ($success) {
                    $this->info("Laporan {$report['device_name']} berhasil dikirim.");
                } else {
                    $this->error("Laporan {$report['device_name']} gagal dikirim.");
                }
            }

            return Command::SUCCESS;

        } catch (\Throwable $e) {

            $this->error($e->getMessage());

            return Command::FAILURE;
        }
    }
}