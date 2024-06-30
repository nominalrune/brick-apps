<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\App;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\View>
 */
class ViewFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition() : array
	{
		return [
			'code' => $this->faker->domainWord(),
			'app_code' => App::factory(),
			'name' => $this->faker->name(),
			'description' => $this->faker->text(),
			'list' => '[]',
			'detail' => '[]',
			'created_at' => now(),
			'updated_at' => now(),
			'created_by' => User::factory(),
			'updated_by' => User::factory(),
		];
	}
}
