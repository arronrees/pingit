<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
}
