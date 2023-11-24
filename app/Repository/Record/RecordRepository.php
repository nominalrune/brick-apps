<?php

namespace App\Repository\Record;

use Illuminate\Support\Facades\DB;
use App\Models\App;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Database\Query\Builder;
class RecordRepository
{
    private Builder $table;
    public function __construct(string $table)
    {
        $this->table = DB::table($table);
    }
    public function get(int $id){
        $record = $this->table->where("id","=", $id)->first();
        if(!$record){
            throw new \Exception("id:$id not found in table.");
        }
        return $record;
    }
    public function getAll(){
        $records = $this->table->get();
        return $records;
    }
    /**
     */
    public function create(array $record)
    {
        $id = $this->table->insertGetId($record);
        return $id;
    }
}
