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
	public function __construct(App $app)
	{
		$tableName = "app-$app->code";
		$this->table = DB::table($tableName);
	}
	public function get(int $id)
	{
		$record = $this->table->where("id", "=", $id)->first();
		if (! $record) {
			throw new \Exception("id:$id not found in table.");
		}
		return $record;
	}
	public function getAll()
	{
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
	public function delete(int $id)
	{
		$record = $this->get($id);
		$this->table->where("id", $id)->delete();
		return $record;
	}
	public function update(int $id, array $record)
	{
		$this->get($id);
		$this->table->where("id", $id)->update($record);
		return $this->get($id);
	}
	public function getTable()
	{
		return $this->table;
	}
}
