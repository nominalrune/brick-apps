<?php

namespace App\Services\App;

use App\Models\App as AppModel;
use Illuminate\Support\Facades\DB;
use App\Repository\Record\RecordRepository;

class DeleteAppService{
    public function delete(string $app_code){

        $app = AppModel::findByCode($app_code);
        $this->deleteAppRecord($app);
        $this->deleteAppTable($app_code);
        $this->deleteUserDefinedModelClassFile($app);
    }
    private function deleteAppRecord(AppModel $app)
    {
        $app->delete();
    }
    private function deleteAppTable(string $code)
    {
        $connection = new RecordRepository($code);
        $connection = DB::connection(env('DB_CONNECTION'))->setDatabaseName(env('DB_DATABASE'));
        $connection->getSchemaBuilder()->dropIfExists($code);
    }
    private function deleteUserDefinedModelClassFile(AppModel $app){
		$path = app_path('Models/UserDefined/' . $app->recordClassName . '.php');
		if (file_exists($path)) {
			unlink($path);
		}
    }

}
