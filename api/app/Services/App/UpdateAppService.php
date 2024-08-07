<?php

namespace App\Services\App;

use Illuminate\Support\Facades\DB;
use App\Models\App;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;
use App\Repository\App\UserDefinedModelClassRepository;

use App\Repository\DB\Column;

class UpdateAppService
{
	/**
	 */
	public function updateApp(string $code, string $name, string $description, string $icon, array|Collection $contents, array $defaultView)
	{
		$app = App::findByCode($code);
		/** @var Collection<int,{code:string;type:string;valueType:string;label:string;prefix:string;suffix:string;defaultValue:mixed;referringAppCode:string;rules:array}> $originalColumns*/
		$originalColumns = collect($app->contents)->flatten(1);
		/** @var Collection<int,{code:string;type:string;valueType:string;label:string;prefix:string;suffix:string;defaultValue:mixed;referringAppCode:string;rules:array}> $newColumns*/
		$columns = collect($contents)->flatten(1)->map(fn ($i) => $i['code']);
		$newColumns = collect($contents)->flatten(1);
		$columnsToAdd = $newColumns->whereNotIn('code', $originalColumns->pluck('code')->all());
		$columnsToChange = $newColumns->filter(function ($col) use ($originalColumns) {
			$item = $originalColumns->firstWhere('code', $col['code']);
			if (! $item) {
				return false;
			}
			return $item["valueType"] !== $col['valueType'];
		});
		// dd(["old"=>$originalColumns,"new"=>$newColumns, "add"=>$columnsToAdd, "change"=>$columnsToChange, "delete"=>$columnsToDelete]);
		$columnsToDelete = $originalColumns->whereNotIn('code', $newColumns->pluck('code')->all());
		$this->updateAppRecord($app, $name, $description, $icon, $contents, $columns);

		$this->updateAppTable($code, $columnsToAdd, $columnsToChange, $columnsToDelete);
		$this->updateUserDefinedModelClassFile($app);
		Log::info('app updated', ['app' => $app]);
		return $app;
	}
	private function updateAppRecord(App $app, string $name, string $description, string $icon, array|Collection $contents, array|Collection $columns)
	{
		$app->update([
			'name' => $name,
			'description' => $description,
			'icon' => $icon,
			'contents' => $contents,
			'columns' => $columns,
		]);
		return $app;
	}
	private function updateAppTable(string $code, Collection $columnsToAdd, Collection $columnsToChange, Collection $columnsToDelete)
	{
		$connection = DB::connection(env('DB_CONNECTION'));
		if (! $connection->getSchemaBuilder()->hasTable($code)) {
			throw new \Exception('table does not exist' . "name:{$code}");
		}

		$connection->getSchemaBuilder()->table($code, function (Blueprint $table) use ($columnsToAdd, $columnsToChange, $columnsToDelete) {
			foreach ($columnsToAdd as $col) {
				$code = $col['code'];
				$valueType = $col['valueType'];
				$this->declareColumn($table, $code, $valueType, $col['refereingAppCode']);
			}
			foreach ($columnsToChange as $col) {
				$code = $col['code'];
				$valueType = $col['valueType'];
				$this->declareColumn($table, $code, $valueType, $col['refereingAppCode']);
			}
			$table->dropColumn($columnsToDelete->pluck('code')->all());
		});
	}
	private function updateUserDefinedModelClassFile(App $app)
	{
		$repository = new UserDefinedModelClassRepository($app);
		$repository->update();
	}

	private function declareColumn(Blueprint $table, string $name, string $valueType, string $referringAppName = '')
	{
		Column::declareColumn($table, $name, $valueType, $referringAppName);
	}
	private function changeColumn(Blueprint $table, string $name, string $valueType, string $referringAppName = '')
	{
		Column::changeColumn($table, $name, $valueType, $referringAppName);
	}
}
