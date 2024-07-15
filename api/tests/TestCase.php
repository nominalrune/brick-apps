<?php

namespace Tests;

use App\Models\App;
use App\Models\User;
use App\Services\App\CreateAppService;
use App\Services\App\DeleteAppService;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
	use CreatesApplication;
	protected User $userA;
	protected User $userB;
	protected App $appA;
	protected App $appB;
	protected App $appC;
	protected function setUp() : void
	{
		parent::setUp();
		$this->userA = User::factory()->create();
		$this->userB = User::factory()->create();
		$this->appA = CreateAppService::create(
			code: 'app_a',
			name: 'App A',
			description: 'App A Description',
			icon: '/icons/record.svg',
			columns: [
				[
					'code' => 'column_a',
					'valueType' => 'varchar',
				],
				[
					'code' => 'column_b',
					'valueType' => 'varchar',
				],
			],
			defaultView: [
				'code' => 'default_view',
				'name' => 'Default View',
				'description' => 'Default View Description',
				'list' => [
					'listType' => 'table',
					'content' => [
						["code" => "column_a", "type" => "text", "label" => "Column A", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
						["code" => "column_b", "type" => "text", "label" => "Column B", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
					],
				],
				'detail' => [[
					["code" => "column_a", "type" => "text", "label" => "Column A", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
					["code" => "column_b", "type" => "text", "label" => "Column B", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
				]],
			],
			creator: $this->userA,
		);
		$this->appB = CreateAppService::create(
			code: 'app_b',
			name: 'App B',
			description: 'App B Description',
			icon: '/icons/record.svg',
			columns: [
				[
					'code' => 'column_a',
					'valueType' => 'varchar',
				],
				[
					'code' => 'column_b',
					'valueType' => 'varchar',
				],
			],
			defaultView: [
				'code' => 'default_view',
				'name' => 'Default View',
				'description' => 'Default View Description',
				'list' => [
					'listType' => 'table',
					'content' => [
						["code" => "column_a", "type" => "text", "label" => "Column A", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
						["code" => "column_b", "type" => "text", "label" => "Column B", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
					],
				],
				'detail' => [[
					["code" => "column_a", "type" => "text", "label" => "Column A", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
					["code" => "column_b", "type" => "text", "label" => "Column B", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
				]],
			],
			creator: $this->userB,
		);
		$this->appC = CreateAppService::create(
			code: 'app_c',
			name: 'App C',
			description: 'App C Description',
			icon: '/icons/record.svg',
			columns: [
				[
					'code' => 'column_a',
					'valueType' => 'varchar',
				],
				[
					'code' => 'column_b',
					'valueType' => 'varchar',
				],
			],
			defaultView: [
				'code' => 'default_view',
				'name' => 'Default View',
				'description' => 'Default View Description',
				'list' => [
					'listType' => 'table',
					'content' => [
						["code" => "column_a", "type" => "text", "label" => "Column A", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
						["code" => "column_b", "type" => "text", "label" => "Column B", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
					],
				],
				'detail' => [[
					["code" => "column_a", "type" => "text", "label" => "Column A", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
					["code" => "column_b", "type" => "text", "label" => "Column B", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
				]],
			],
			creator: $this->userA,
		);
	}
	protected function tearDown() : void
	{
		DeleteAppService::delete($this->appA);
		DeleteAppService::delete($this->appB);
	}
}
