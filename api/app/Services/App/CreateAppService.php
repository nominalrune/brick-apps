<?php

namespace App\Services\App;

use App\Repository\App\ViewRepository;
use Illuminate\Support\Facades\DB;
use App\Models\App;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use App\Repository\App\UserDefinedModelClassRepository;
use App\Models\User;
use App\Models\View;
use App\Services\DB\Column;

class CreateAppService
{
	public function __construct()
	{
	}
	/**
	 */
	public function create(
		string $code,
		string $name,
		string $description,
		string $icon,
		array $columns,
		array $defaultView,
		User $creator
	) {
		$app = $this->createAppRecord($code, $name, $description, $icon, $columns, $creator);
		info('app', ['app' => $app]);
		$this->createAppTable($code, $columns);
		$this->createDefaultView($app, $defaultView);
		Log::info('app created', ['app' => $app]);
		$repository = new UserDefinedModelClassRepository(
			$app,
			
		);
		$repository->create();
		return $app;
	}
	private function createAppRecord(string $code, string $name, string $description, string $icon, array $columns, User $creator)
	{
		$app = App::create([
			'code' => $code,
			'name' => $name,
			'description' => $description,
			'icon' => $icon,
			'columns' => $columns,
			'default_view' => null,
			'created_by' => $creator->id,
			'updated_by' => $creator->id,
		]);
		return $app;
	}
	private function createDefaultView(App $app, array $view)
	{
		$view = View::create([
			'app_code' => $app->code,
			'code' => $view['code'],
			'name' => $view['name'],
			'description' => $view['description'],
			'list' => $view['list'],
			'detail' => $view['detail'],
			'file' => app_path("Models/UserDefined/{$app->code}/{$view['code']}.json"),
			'created_by' => $app->created_by,
			'updated_by' => $app->created_by,
		]);
		$app->update(['default_view' => $view->code]);
		return $view;
	}
	private function createAppTable(string $code, array $columns)
	{
		$connection = DB::connection(env('DB_CONNECTION'));
		if ($connection->getSchemaBuilder()->hasTable($code)) {
			throw new \Exception('table already exists' . "name:{$code}");
		}
		$connection->getSchemaBuilder()->create($code, function (Blueprint $table) use ($columns) {
			$table->id();
			$table->timestamps();
			$table->foreignId('created_by')->nullable()->constrained('users')->onUpdate('restrict')->onDelete('set null');
			$table->foreignId('updated_by')->nullable()->constrained('users')->onUpdate('restrict')->onDelete('set null');
			foreach ($columns as $column) {
				$code = $column['code'];
				$valueType = $column['valueType'];
				if ($valueType === 'reference') {
					$table->foreignId($code)->nullable()->constrained($column['referringAppName'])->onUpdate('restrict')->onDelete('set null');
					continue;
				}
				$this->declareColumn($table, $code, $valueType);
			}
		});
	}

	private function declareColumn(Blueprint $table, string $name, string $valueType)
	{
		Column::declareColumn($table, $name, $valueType);
	}
}
