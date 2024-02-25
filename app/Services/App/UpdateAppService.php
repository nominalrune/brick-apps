<?php

namespace App\Services\App;

use Illuminate\Support\Facades\DB;
use App\Models\App;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;
use App\Services\DB\Column;

class UpdateAppService
{
    public function __construct()
    {
    }
    /**
     * @param string $name
     * @param string $description
     * @param array $form
     */
    public function updateApp(string $code, string $name, string $description, string $icon, array $form)
    {
        $app = App::where("code", $code)->first();
        /** @var Collection<int,{code:string;type:string;valueType:string;label:string;prefix:string;suffix:string;defaultValue:mixed;referringAppCode:string;rules:array}> $originalColumns*/
        $originalColumns = collect($app->form)->flatten(1);
        /** @var Collection<int,{code:string;type:string;valueType:string;label:string;prefix:string;suffix:string;defaultValue:mixed;referringAppCode:string;rules:array}> $newColumns*/
        $form_keys = collect($form)->flatten(1)->map(fn ($i) => $i['code']);
        $newColumns = collect($form)->flatten(1);
        $columnsToAdd = $newColumns->whereNotIn('code', $originalColumns->pluck('code')->all());
        // $columnsToChange =[];
        $columnsToChange = $newColumns->filter(function ($col) use ($originalColumns) {
            $item = $originalColumns->firstWhere('code', $col['code']);
            if (! $item) {
                return false;
            }
            return $item["valueType"] !== $col['valueType'];
        });
        $columnsToDelete = $originalColumns->whereNotIn('code', $newColumns->pluck('code')->all());
        Log::info(print_r(["old"=>$originalColumns,"new"=>$newColumns, "add"=>$columnsToAdd, "change"=>$columnsToChange, "delete"=>$columnsToDelete],true));
        $app->update([
            'name' => $name,
            'description' => $description,
            'icon' => $icon,
            'form' => $form,
            'form_keys' => $form_keys,
        ]);
        Log::info('app updated', ['app' => $app]);
        $connection = DB::connection(env('DB_CONNECTION'));
        if (! $connection->getSchemaBuilder()->hasTable($code)) {
            throw new \Exception('table does not exist. ' . "name:{$code}");
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
        return $app;
    }
    private function declareColumn(Blueprint $table, string $name, string $valueType, string $referringAppName = '')
    {
        Column::declareColumn($table, $name, $valueType);
    }
    private function changeColumn(Blueprint $table, string $name, string $valueType, string $referringAppName = '')
    {
        Column::changeColumn($table, $name, $valueType, $referringAppName);
    }
}
