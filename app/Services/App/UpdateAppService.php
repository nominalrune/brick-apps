<?php

namespace App\Services\App;

use Illuminate\Support\Facades\DB;
use App\Models\App;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;

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
    public function updateApp(string $code, string $name, string $description, string $icon, array $form, array $form_keys)
    {
        $app = App::where("code", $code)->first();
        /** @var Collection<int,{code:string;type:string;valueType:string;label:string;prefix:string;suffix:string;defaultValue:mixed;referringAppCode:string;rules:array}> $originalColumns*/
        $originalColumns = collect($app->form)->flatten(1);
        /** @var Collection<int,{code:string;type:string;valueType:string;label:string;prefix:string;suffix:string;defaultValue:mixed;referringAppCode:string;rules:array}> $newColumns*/
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
        // dd(["old"=>$originalColumns,"new"=>$newColumns, "add"=>$columnsToAdd, "change"=>$columnsToChange, "delete"=>$columnsToDelete]);
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
                if ($valueType === 'reference') {
                    $table->foreignId($code)->nullable()->constrained($col['referringAppCode'])->onUpdate('restrict')->onDelete('set null');
                    continue;
                }
                $this->declareColumn($table, $code, $valueType);
            }
            foreach ($columnsToChange as $col) {
                $code = $col['code'];
                $valueType = $col['valueType'];
                if ($valueType === 'reference') {
                    $table->foreignId($code)->nullable()->constrained($col['referringAppCode'])->onUpdate('restrict')->onDelete('set null')->change();
                    continue;
                }
                $this->declareColumn($table, $code, $valueType);
            }

            $table->dropColumn($columnsToDelete->pluck('code')->all());

        });
        return $app;
    }
    private function declareColumn(Blueprint $table, string $name, string $valueType)
    {
        switch ($valueType) {
            case 'varchar':
                $table->string($name, 255);
                break;
            case 'text':
                $table->text($name);
                break;
            case 'integer':
                $table->integer($name);
                break;
            case 'double':
                $table->double($name);
                break;
            case 'boolean':
                $table->boolean($name);
                break;
            case 'date':
                $table->date($name);
                break;
            case 'datetime':
                $table->datetime($name);
                break;
            case 'time':
                $table->time($name);
                break;
            case 'json':
                $table->json($name);
                break;
            case 'blob':
                $table->binary($name);
                break;
            default:
                throw new \Exception('invalid value type' . "name:{$name}, valueType:{$valueType}");
        }
    }
    private function changeColumn(Blueprint $table, string $name, string $valueType)
    {
        switch ($valueType) {
            case 'varchar':
                $table->string($name, 255)->change();
                break;
            case 'text':
                $table->text($name)->change();
                break;
            case 'integer':
                $table->integer($name)->change();
                break;
            case 'double':
                $table->double($name)->change();
                break;
            case 'boolean':
                $table->boolean($name)->change();
                break;
            case 'date':
                $table->date($name)->change();
                break;
            case 'datetime':
                $table->datetime($name)->change();
                break;
            case 'time':
                $table->time($name)->change();
                break;
            case 'json':
                $table->json($name)->change();
                break;
            case 'blob':
                $table->binary($name)->change();
                break;
            default:
                throw new \Exception('invalid value type' . "name:{$name}, valueType:{$valueType}");
        }
    }
}
