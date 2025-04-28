<?php

use App\Models\Ping;
use App\Models\PingCheck;
use App\Models\User;
use Illuminate\Testing\Assert;
use Inertia\Testing\AssertableInertia;

// TODO 
// - inertial rendering for all routes

// ping index page can be accessed
test('ping index page can be accessed and shows user pings', function () {
    $user = User::factory()->create();

    $pings = Ping::factory(5)->create([
        'user_id' => $user->id,
    ]);

    $this->actingAs($user)
        ->get(route('pings.index'))
        ->assertOk(200)
        ->assertInertia(
            fn(AssertableInertia $page) =>
            $page
                ->component('pings/index')
                ->has('pings', 5)
                ->where('pings.0.id', $pings->first()->id)
        );
});

// ping show page can be accessed
test('ping show page can be accessed and shows ping details', function () {
    $user = User::factory()->create();

    $ping = Ping::factory()->create([
        'user_id' => $user->id,
    ]);

    $checks = PingCheck::factory(10)->create([
        'ping_id' => $ping->id,
    ]);

    $this->actingAs($user)
        ->get(route('pings.show', $ping->id))
        ->assertOk(200)
        ->assertInertia(
            fn(AssertableInertia $page) =>
            $page
                ->component('pings/show')
                ->has(
                    'ping',
                    fn(AssertableInertia $page) => $page
                        ->where('id', $ping->id)
                        ->where('url', $ping->url)
                        ->where('interval', $ping->interval)
                        ->where('active', $ping->active)
                        ->has(
                            'checks',
                            10,
                            fn(AssertableInertia $page) => $page
                                ->where('ping_id', $ping->id)
                                ->where('id', $checks->first()->id)
                                ->etc()
                        )
                        ->etc()
                )
        );
});

// ping create page can be accessed
// ping can be created

// ping update page can be accessed
// ping can be updated

// ping can be deleted
