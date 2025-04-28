<?php

namespace Database\Factories;

use App\Models\Ping;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PingCheck>
 */
class PingCheckFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status' => fake()->randomElement([200, 400, 500]),
            'time_checked' => fake()->dateTime(),
            'ping_id' => Ping::factory(),
        ];
    }
}
