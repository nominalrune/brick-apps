<?php

namespace App\Services\App;

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
	public function createApp(
		string $code,
		string $name,
		string $description,
		string $icon,
		array $fields,
		array $view,
		User $creator
	) {
		$app = $this->createAppRecord($code, $name, $description, $icon, $fields, $creator);
		Log::info('app', ['app' => $app]);
		$this->createAppTable($code, $fields);
		$this->createView($app, $view);
		$this->createUserDefinedModelClassFile($app);
		Log::info('app created', ['app' => $app]);

		return $app;
	}
	private function createAppRecord(string $code, string $name, string $description, string $icon, array $fields, User $creator)
	{
		$app = App::create([
			'code' => $code,
			'name' => $name,
			'description' => $description,
			'icon' => $icon,
			'fields' => $fields,
			'default_view' => null,
			'created_by' => $creator->id,
			'updated_by' => $creator->id,
		]);
		return $app;
	}
	private function createView(App $app, array $view)
	{
		$view = View::create([
			'app_code' => $app->code,
			'name' => $view['name'],
			'code' => $view['code'],
			'description' => $view['description'],
			'content' => $view['content'],
			'created_by' => $app->created_by,
			'updated_by' => $app->created_by,
		]);
		$app->update(['default_view' => $view->code]);
		return $view;
	}
	private function createAppTable(string $code, array $fields)
	{
		$connection = DB::connection(env('DB_CONNECTION'));
		if ($connection->getSchemaBuilder()->hasTable($code)) {
			throw new \Exception('table already exists' . "name:{$code}");
		}
		$connection->getSchemaBuilder()->create($code, function (Blueprint $table) use ($fields) {
			$table->id();
			$table->timestamps();
			$table->foreignId('created_by')->nullable()->constrained('users')->onUpdate('restrict')->onDelete('set null');
			$table->foreignId('updated_by')->nullable()->constrained('users')->onUpdate('restrict')->onDelete('set null');
			foreach ($fields as $input) {
				$code = $input['code'];
				$valueType = $input['valueType'];
				if ($valueType === 'reference') {
					$table->foreignId($code)->nullable()->constrained($input['referringAppName'])->onUpdate('restrict')->onDelete('set null');
					continue;
				}
				$this->declareColumn($table, $code, $valueType);
			}
		});
	}
	private function createUserDefinedModelClassFile(App $app)
	{
		$repository = new UserDefinedModelClassRepository($app);
		$repository->create();
	}

	private function declareColumn(Blueprint $table, string $name, string $valueType)
	{
		Column::declareColumn($table, $name, $valueType);
	}
}
