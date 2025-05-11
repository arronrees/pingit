<?php

use App\Models\Ping;
use App\Models\PingCheck;
use App\Models\PingCheckRetry;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

// ping checks page can be accessed
test('ping checks page can be accessed', function () {
  $user = User::factory()->create();
  $this->actingAs($user);

  $ping = Ping::factory()->create([
    'user_id' => $user->id,
  ]);
  $checks = PingCheck::factory(50)->create(['ping_id' => $ping->id]);

  $this->actingAs($user)
    ->get(route('checks.index', $ping->id))
    ->assertOk(200)
    ->assertInertia(
      fn(AssertableInertia $page) =>
      $page
        ->component('checks/index')
        ->has('data')
        ->where('data.data.0.ping_id', $checks->first()->ping_id)
        ->has('ping')
        ->where('ping.id', $ping->id)
        ->has('data.data', 15)
    );
});

test('ping check show page can be accessed', function () {
  $user = User::factory()->create();
  $this->actingAs($user);

  $ping = Ping::factory()->create([
    'user_id' => $user->id,
  ]);
  $check = PingCheck::factory()->create(['ping_id' => $ping->id]);
  $retry = PingCheckRetry::factory()->create(['ping_check_id' => $check->id]);

  // $this->actingAs($user)
  //   ->get(route('checks.show', ['ping' => $check->ping_id, 'check' => $check->id]))
  //   ->assertOk(200)
  //   ->assertInertia(
  //     fn(AssertableInertia $page) =>
  //     $page
  //       ->component('checks/show')
  //       ->has('check')
  //       ->where('check.id', $check->id)
  //       ->where('check.status', $check->status)
  //       ->has('check.ping')
  //       ->where('check.ping.id', $ping->id)
  //       ->has('check.retries', 10)
  //       ->etc()
  //   );

  $this->actingAs($user)
    ->get(route('checks.show', ['ping' => $check->ping_id, 'check' => $check->id]))
    ->assertOk(200)
    ->assertInertia(
      fn(AssertableInertia $page) =>
      $page
        ->component('checks/show')
        ->has(
          'check',
          fn(AssertableInertia $page) => $page
            ->where('id', $check->id)
            ->where('status', $check->status)
            ->etc()
            ->has(
              'ping',
              fn(AssertableInertia $page) => $page
                ->where('id', $ping->id)
                ->etc()
            )
            ->has(
              'retries',
              1,
              fn(AssertableInertia $page) => $page
                ->where('id', $retry->id)
                ->etc()
            )
        )
    );
});
