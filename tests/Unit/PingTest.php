<?php

use App\Models\Ping;
use App\Models\PingCheck;
use App\Models\PingCheckRetry;
use App\Models\User;

test('ping belongs to a user', function () {
    $user = User::factory()->create();
    $ping = Ping::factory()->create([
        'user_id' => $user->id,
    ]);

    expect($ping->user->is($user))->toBeTrue();
});

test('ping has many pings checks', function () {
    $ping = Ping::factory()->create();

    PingCheck::factory(5)->create([
        'ping_id' => $ping->id,
    ]);

    expect($ping->checks->count())->toBe(5);
});

test('ping check has many retries', function () {
    $pingCheck = PingCheck::factory()->create();

    PingCheckRetry::factory(5)->create([
        'ping_check_id' => $pingCheck->id,
    ]);

    expect($pingCheck->retries->count())->toBe(5);
});
