<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\View;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\App>
 */
class AppFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition() : array
	{
		return [
			'name' => $this->faker->name(),
			'description' => $this->faker->text(),
			'code' => $this->faker->text(),
			'icon' => $this->faker->imageUrl(),
			'default_view' => View::factory(),
			'created_at' => now(),
			'updated_at' => now(),
			'created_by' => User::factory(),
			'updated_by' => User::factory(),
		];
	}
}
