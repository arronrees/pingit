<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Ping extends Model
{
    /** @use HasFactory<\Database\Factories\PingFactory> */
    use HasFactory;

    protected $fillable = [
        'url',
        'interval',
        'active',
        'user_id'
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
            'interval' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function checks(): HasMany
    {
        return $this->hasMany(PingCheck::class);
    }

    public function latestCheck(): HasOne
    {
        return $this->hasOne(PingCheck::class)->latest('time_checked');
    }
}
