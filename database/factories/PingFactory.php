<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ping>
 */
class PingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'url' => fake()->url(),
            'interval' => fake()->randomElement([
                '60',
                '120',
                '180',
                '240',
                '300',
                '600',
                '900',
                '1800',
                '2700',
                '3600',
                '7200',
                '10800',
                '21600',
                '43200',
                '86400'
            ]),
            'active' => true,
            'user_id' => User::factory(),
        ];
    }
}
