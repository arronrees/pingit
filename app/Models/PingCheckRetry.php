<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PingCheckRetry extends Model
{
    /** @use HasFactory<\Database\Factories\PingCheckRetryFactory> */
    use HasFactory;

    protected $fillable = [
        'status',
        'time_checked',
        'ping_check_id',
    ];

    public function check(): BelongsTo
    {
        return $this->belongsTo(PingCheck::class);
    }
}
