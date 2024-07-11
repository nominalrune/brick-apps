<?php

namespace Domain\App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\App;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use App\Repository\App\UserDefinedModelClassRepository;

use App\Services\DB\Column;

class CreateAppService
{
	public function __construct()
	{
	}
	/**
	 * @param string $name
	 * @param string $description
	 * @param array $form
	 */
	public function createApp(string $code, string $name, string $description, string $icon, array $form, array $form_keys)
	{
		$app = $this->createAppMetaData($code, $name, $description, $icon, $form, $form_keys);
		$this->createAppTable($code, $form);
		$this->createUserDefinedModelClassFile($app);
		Log::info('app created', ['app' => $app]);

		return $app;
	}

	/**
	 * insert app data to `apps` table
	 * TODO : move to repository
	 */
	private function createAppMetadata(string $code, string $name, string $description, string $icon, array $columns)
	{
		$app = App::create([
			'code' => $code,
			'name' => $name,
			'description' => $description,
			'icon' => $icon,
			'columns' => $columns,
		]);
		return $app;
	}

	/**
	 * create user-defined-table directly onto the database
	 * TODO : move to repository
	 */
	private function createAppTable(string $code, array $form)
	{
		$connection = DB::connection(env('DB_CONNECTION'));
		if ($connection->getSchemaBuilder()->hasTable($code)) {
			throw new \Exception('table already exists' . "name:{$code}");
		}
		$connection->getSchemaBuilder()->create($code, function (Blueprint $table) use ($form) {
			$table->id();
			$table->timestamps();
			$table->foreignId('created_by')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');
			$table->foreignId('updated_by')->nullable()->constrained('users')->onUpdate('cascade')->onDelete('set null');
			foreach ($form as $inputs) {
				foreach ($inputs as $input) {
					$code = $input['code'];
					$valueType = $input['valueType'];
					if ($valueType === 'reference') {
						$table->foreignId($code)->nullable()->constrained($input['referringAppName'])->onUpdate('restrict')->onDelete('set null');
						continue;
					}
					$this->declareColumn($table, $code, $valueType);
				}
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
