<?php

namespace Tests\Feature\Record\Index;

use App\Models\App;
use Tests\TestCase;

class IndexTest extends TestCase
{
	protected function setUp() : void
	{
		parent::setUp();
	}
	public function test_returns_list_of_apps_for_authenticated_user_with_permissions() : void
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