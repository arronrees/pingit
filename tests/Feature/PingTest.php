<?php

use App\Models\Ping;
use App\Models\PingCheck;
use App\Models\User;
use Illuminate\Testing\Assert;
use Inertia\Testing\AssertableInertia;

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
test('ping create page can be accessed and shows ping form', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('pings.create'))
        ->assertOk(200)
        ->assertInertia(
            fn(AssertableInertia $page) =>
            $page
                ->component('pings/create')
        );
});

// ping can be created
test('ping can be created', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('pings.store'), [
            'url' => 'https://example.com',
            'interval' => 3600,
            'active' => true,
        ])
        ->assertRedirect(route('pings.index'))
        ->assertSessionHas('success', 'Ping created successfully.');
});

// ping update page can be accessed
test('ping update page can be accessed and shows update form', function () {
    $user = User::factory()->create();

    $ping = Ping::factory()->create([
        'user_id' => $user->id,
    ]);

    $checks = PingCheck::factory(10)->create([
        'ping_id' => $ping->id,
    ]);

    $this->actingAs($user)
        ->get(route('pings.edit', $ping->id))
        ->assertOk(200)
        ->assertInertia(
            fn(AssertableInertia $page) =>
            $page
                ->component('pings/edit')
                ->has(
                    'ping',
                    fn(AssertableInertia $page) => $page
                        ->where('id', $ping->id)
                        ->where('url', $ping->url)
                        ->where('interval', $ping->interval)
                        ->where('active', $ping->active)
                        ->etc()
                )
        );
});

// ping can be updated
test('ping can be updated', function () {
    $user = User::factory()->create();
    $ping = Ping::factory()->create([
        'user_id' => $user->id,
    ]);

    $this->actingAs($user)
        ->put(route('pings.update', $ping->id), [
            'url' => 'https://example.com',
            'interval' => 3600,
            'active' => false,
        ])
        ->assertRedirect(route('pings.show', $ping->id))
        ->assertSessionHas('success', 'Ping updated successfully.');
});

// ping can be deleted
