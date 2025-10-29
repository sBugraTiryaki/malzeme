<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(2),
            'content' => fake()->paragraphs(5, true),
            'location' => fake()->randomElement(['Üniversite Konferans Salonu', 'Amfi A', 'Laboratuvar 201', 'Mühendislik Fakültesi']),
            'guest' => fake()->name().' - '.fake()->jobTitle(),
            'event_date' => fake()->dateTimeBetween('-3 months', '+6 months'),
            'image' => null,
            'is_published' => true,
            'is_featured' => fake()->boolean(30),
        ];
    }
}
