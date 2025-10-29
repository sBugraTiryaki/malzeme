<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TeamMember>
 */
class TeamMemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['advisor', 'board']);

        return [
            'name' => fake()->name(),
            'role' => $type === 'advisor' ? 'Kulüp Danışmanı' : fake()->randomElement(['Başkan', 'Başkan Yardımcısı', 'Sekreter', 'Sayman', 'Etkinlik Koordinatörü', 'Sosyal Medya Sorumlusu']),
            'type' => $type,
            'board_year' => $type === 'board' ? fake()->randomElement(['2023-2024', '2024-2025', '2025-2026']) : null,
            'department' => $type === 'advisor' ? 'Malzeme Bilimi ve Metalurji Mühendisliği' : null,
            'year' => $type === 'board' ? fake()->randomElement(['1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf']) : null,
            'email' => fake()->safeEmail(),
            'linkedin' => fake()->optional()->url(),
            'github' => fake()->optional()->url(),
            'image' => null,
            'order' => fake()->numberBetween(0, 100),
            'is_published' => true,
        ];
    }
}
