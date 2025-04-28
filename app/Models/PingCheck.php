<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PingCheck extends Model
{
    /** @use HasFactory<\Database\Factories\PingCheckFactory> */
    use HasFactory;

    protected $fillable = [
        'status',
        'time_checked',
        'ping_id',
    ];

    public function Ping(): BelongsTo
    {
        return $this->belongsTo(Ping::class);
    }

    public function retries(): HasMany
    {
        return $this->hasMany(PingCheckRetry::class);
    }
}
