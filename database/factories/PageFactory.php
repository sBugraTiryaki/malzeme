<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Page>
 */
class PageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->words(3, true);

        return [
            'slug' => \Illuminate\Support\Str::slug($title),
            'title' => $title,
            'content' => fake()->paragraphs(6, true),
            'sections' => null,
            'is_published' => true,
        ];
    }
}
