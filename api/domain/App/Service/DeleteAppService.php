<?php

namespace Domain\App\Services;

use App\Models\App as AppModel;
use Illuminate\Support\Facades\DB;
use Repository\Record\RecordRepository;

class DeleteAppService{
    public function delete(string $app_code){

        $app = AppModel::findByCode($app_code);
        $this->deleteAppMetadata($app);
        $this->dropAppTable($app_code);
        $this->deleteUserDefinedModelClassFile($app_code);
    }
    private function deleteAppMetadata(AppModel $app)
    {
        $app->forceDelete();
    }
    private function dropAppTable(string $code)
    {
        $connection = new RecordRepository($code);
        $connection = DB::connection(env('DB_CONNECTION'))->setDatabaseName(env('DB_DATABASE'));
        $connection->getSchemaBuilder()->dropIfExists($code);
    }
    private function deleteUserDefinedModelClassFile(string $code){
    }
}
