<?php

namespace App\Services\App;

use App\Models\App as AppModel;
use Illuminate\Support\Facades\DB;
use App\Repository\Record\RecordRepository;

class DeleteAppService
{
	public static function delete(string $app_code)
	{

		$app = AppModel::findByCode($app_code);
		self::deleteAppRecord($app);
		self::deleteAppTable($app);
		self::deleteUserDefinedModelClassFile($app);
	}
	private static function deleteAppRecord(AppModel $app)
	{
		$app->delete();
	}
	private static function deleteAppTable(AppModel $app)
	{
		$connection = new RecordRepository($app);
		$connection = DB::connection(env('DB_CONNECTION'))->setDatabaseName(env('DB_DATABASE'));
		$connection->getSchemaBuilder()->dropIfExists($app->code);
	}
	private static function deleteUserDefinedModelClassFile(AppModel $app)
	{
		$path = app_path('Models/UserDefined/' . $app->recordClassName . '.php');
		if (file_exists($path)) {
			unlink($path);
		}
	}

}
