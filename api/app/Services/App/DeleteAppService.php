<?php

namespace App\Services\App;

use App\Models\App as AppModel;
use Illuminate\Support\Facades\DB;

class DeleteAppService{
    public function delete(string $app_code){

        $app = AppModel::findByCode($app_code);
        $this->deleteAppRecord($app);
        $this->deleteAppTable($app_code);
        $this->deleteUserDefinedModelClassFile($app_code);
    }
    private function deleteAppRecord(App $app)
    {
        $app->delete();
    }
    private function deleteAppTable(string $code)
    {
        $connection = new RecordRepository($code);
        $connection = DB::connection(env('DB_CONNECTION'))->setDatabaseName(env('DB_DATABASE'));
        $connection->getSchemaBuilder()->dropIfExists($code);
    }
    private function deleteUserDefinedModelClassFile(string $code){
    }
}
