<?php

use App\Models\Ping;
use App\Models\PingCheck;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

// ping checks page can be accessed
test('ping checks page can be accessed', function () {
  $user = User::factory()->create();
  $this->actingAs($user);

  $ping = Ping::factory()->create([
    'user_id' => $user->id,
  ]);
  $checks = PingCheck::factory(10)->create(['ping_id' => $ping->id]);

  $this->actingAs($user)
    ->get(route('checks.index', $ping->id))
    ->assertOk(200)
    ->assertInertia(
      fn(AssertableInertia $page) =>
      $page
        ->component('checks/index')
        ->has('checks', 10)
        ->where('checks.0.ping_id', $checks->first()->ping_id)
        ->has('ping')
        ->where('ping.id', $ping->id)
    );
});
