<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\App;
use App\Models\View;
use App\Models\AppPermission;
use App\Models\Permission;
use App\Models\ViewPermission;
use App\Models\Group;
use App\Models\UserGroup;
use App\Models\Profile;
use Illuminate\Support\Facades\Log;

class DemoSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 */
	public function run() : void
	{
		// \App\Models\User::factory(10)->create();

		$user = User::factory()
			->has(Profile::factory()
				->state(fn (array $attributes, User $user) => [
					'user_id' => $user->id,
				])
			)
			->create([
				'email' => 'test@example.com',
				'password' => '$2y$12$6nx25DWCxcGxkzv21YX/hufDWRevqjNoDgyE7KdyLDHtHaXDjtFmS', // password
			]);
		$group = Group::factory()->create([
			'name' => 'Test Group',
			'code' => 'test',
		]);
		UserGroup::factory()->create([
			'user_id' => $user->id,
			'group_id' => $group->id,
		]);
		$app = App::factory()
			// ->has(AppPermission::factory()->state(fn (array $attributes, App $app) => [
			// 	'app_code' => $app->code,
			// 	'group_code' => $group->code,
			// 	'permission' => Permission::READ | Permission::UPDATE | Permission::DELETE,
			// ]))
			->create([
				'name' => 'Test App',
				'code' => 'test',
				'icon' => '/icons/record.svg',
				'fields' => '[{"code":"name","valueType":"text"}]',
				'default_view' => null,
				'created_by' => $user->id,
				'updated_by' => $user->id,
			]);
		Log::info('App created', ['app' => $app->toArray()]);
		$view = View::factory()
			// ->has(
			// 	ViewPermission::factory()->state(fn (array $attributes, View $view) => [
			// 		'view_code' => $view->code,
			// 		'group_code' => $group->code,
			// 		'permission' => Permission::READ | Permission::UPDATE | Permission::DELETE,
			// 	])
			// )
			->create([
				'app_code' => $app->code,
				'name' => 'Test View',
				'code' => 'test',
				'content' => '[["code":"name","type":"text","label":"name","rules":null,"prefix":"","suffix":"","defaultValue":""]]',
				'created_by' => $user->id,
				'updated_by' => $user->id,
			]);
		Log::info('View created', ['view' => $view->toArray()]);
		$app->default_view = $view->code;
		$app->save();
	}
}
