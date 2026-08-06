<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Setting extends Model
{
    use HasFactory;

    protected $table = 'settings';
    protected $fillable = [
        'notification_interval',
        'whatsapp_enabled',
        'telegram_enabled',
        'whatsapp_number',
        'whatsapp_api_key',
        'telegram_bot_token',
        'telegram_chat_id',
        'timezone',
        'temperature_min',
        'temperature_max',
        'humidity_min',
        'humidity_max'
    ];

    protected $casts = [
        'temperature_min' => 'float',
        'temperature_max' => 'float',
        'humidity_min'    => 'float',
        'humidity_max'    => 'float',
        'whatsapp_enabled' => 'boolean',
        'telegram_enabled' => 'boolean'
    ];
}
