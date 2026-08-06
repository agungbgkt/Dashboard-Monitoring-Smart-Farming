<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Device extends Model
{
    use HasFactory;

    protected $table = 'devices';
    protected $fillable = [
        'device_code',
        'device_name',
        'ip_address',
        'location',
        'status'
    ];

    public function monitoringLogs(){
        return $this->hasMany(
            MonitoringLog::class
        );
    }

    public function settings(){
        return $this->hasMany(
            Setting::class
        );
    }
}
