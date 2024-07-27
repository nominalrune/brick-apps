<?php

namespace Tests\Feature\App\Create;

use App\Models\App;
use Tests\TestCase;

class CreateTest extends TestCase
{
	protected array $validRequestBody;
	protected array $invalidRequestBody;

	protected function setUp() : void
	{
		parent::setUp();
		$this->validRequestBody = [
			'code' => 'code',
			'name' => 'name',
			'description' => 'description',
			'icon' => '/icon.png',
			'columns' => [[
				'code' => 'code',
				'valueType' => 'varchar',
			]],
			'defaultView' => [
				'code' => 'code',
				'description' => 'description',
				'detail' => [[[
					'code' => 'code',
					'type' => 'text',
					'suffix' => '',
					'prefix' => '',
					'label' => 'label',
					'defaultValue' => '',
				]]],
				'list' => [
					'listType' => 'table',
					'content' => [
						["code" => "column_a", "type" => "text", "label" => "Column A", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
						["code" => "column_b", "type" => "text", "label" => "Column B", "rules" => null, "prefix" => "", "suffix" => "", "defaultValue" => ""],
					],
				],
			]
		];
		$this->invalidRequestBody = [
			'code' => 'code' . str_repeat('a', 256),
			'name' => 'name' . str_repeat('a', 256),
			'description' => 'description' . str_repeat('a', 5000),
			'icon' => '../invalid_file',
			'columns' => [[
				'code' => 'code' . str_repeat('a', 256),
				'valueType' => 'not a type',
			]],
			'defaultView' => [
				'code' => 'code' . str_repeat('a', 256),
				'description' => 'description' . str_repeat('a', 5000),
				'detail' => [[[
					'code' => 'code' . str_repeat('a', 256),
					'type' => 'bot a type',
					'suffix' => str_repeat('a', 256),
					'prefix' => str_repeat('a', 256),
					'label' => 'label' . str_repeat('a', 256),
					'defaultValue' => str_repeat('a', 5000),
				]]],
				'list' => [
					'listType' => 'not a type',
					'content' => [
						["code" => "column" . str_repeat('a', 256),
							"type" => "not a type",
							"label" => "Column A" . str_repeat('a', 256),
							"rules" => null, "prefix" => str_repeat('a', 256),
							"suffix" => str_repeat('a', 256),
							"defaultValue" => str_repeat('a', 5000)],
						["code" => "column" . str_repeat('a', 256),
							"type" => "not a type",
							"label" => "Column B" . str_repeat('a', 256),
							"rules" => null, "prefix" => str_repeat('a', 256),
							"suffix" => str_repeat('a', 256),
							"defaultValue" => str_repeat('a', 5000)],
					],
				],
			]
		];
	}
	public function test_returns_404_for_non_authenticated_request() : void
	{
	}
	public function test_creates_an_app_for_vaild_request() : void
	{
		$this
			->actingAs($this->userA)
			->getJson("/apps")
			->assertStatus(200)
			->assertJsonCount(2)
			->assertJson([[
				'code' => 'app_a',
				'name' => 'App A',
				'description' => 'App A Description',
				'icon' => '/icons/record.svg',
				'columns' => [
					[
						'code' => 'column_a',
						'valueType' => 'varchar',
					],
					[
						'code' => 'column_b',
						'valueType' => 'varchar',
					],
				],
				'default_view' => 'default_view',
				'createdBy' => [
					'name' => $this->userA->name,
					'icon' => null,
				],
				'updatedBy' => [
					'name' => $this->userA->name,
					'icon' => null,
				],
			], [
				'code' => 'app_c',
				'name' => 'App C',
				'description' => 'App C Description',
				'icon' => '/icons/record.svg',
				'columns' => [
					[
						'code' => 'column_a',
						'valueType' => 'varchar',
					],
					[
						'code' => 'column_b',
						'valueType' => 'varchar',
					],
				],
				'default_view' => 'default_view',
				'createdBy' => [
					'name' => $this->userA->name,
					'icon' => null,
				],
				'updatedBy' => [
					'name' => $this->userA->name,
					'icon' => null,
				],
			]])
		;
	}
}