<?php

namespace Database\Factories;

use App\Models\PingCheck;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PingCheckRetry>
 */
class PingCheckRetryFactory extends Factory
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
            'ping_check_id' => PingCheck::factory(),
        ];
    }
}
