<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class NotificationLog extends Model
{
    use HasFactory;

    protected $table = 'notification_logs';
    protected $fillable = [
        'device_id',
        'temperature',
        'humidity',
        'message',
        'send_at',
        'status'
    ];

    public $timestamps = false;

    protected $casts = [
        'temperature' => 'float',
        'humidity' => 'float',
        'send_at' => 'datetime'
    ];

    public function device(){
        return $this->belongsTo(
            Device::class
        );
    }
}
