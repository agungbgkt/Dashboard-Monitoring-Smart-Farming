<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MonitoringLog extends Model
{
    use HasFactory;

    protected $table = 'monitoring_logs';
    public $timestamps = false;
    protected $fillable = [
        'device_id',
        'temperature',
        'humidity',
        'recorded_at'
    ];
    protected $casts = [
        'temperature'=>'float',
        'humidity'=>'float',
        'recorded_at'=>'datetime'
    ];

    public function device(){
        return $this->belongsTo(
            Device::class
        );
    }
}
