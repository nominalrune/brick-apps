<?php

namespace App\Services\App;

use App\Models\App as AppModel;
use App\Repository\Record\RecordRepository;
use Illuminate\Support\Facades\DB;

class DeleteAppService{
    public function delete(string $app_code){
        $app = AppModel::findByCode($app_code);


        $connection = new RecordRepository($app_code);
        DB::

        $app->delete();
    }
}
