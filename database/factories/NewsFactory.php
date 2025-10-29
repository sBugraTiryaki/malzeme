<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(6);

        return [
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'excerpt' => fake()->paragraph(1),
            'content' => fake()->paragraphs(8, true),
            'image' => null,
            'author' => fake()->name(),
            'is_published' => true,
            'is_featured' => fake()->boolean(20),
            'published_at' => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }
}
