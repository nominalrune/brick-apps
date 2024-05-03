<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\View;

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
			'default_view_code' => View::factory(),
		];
	}
}
