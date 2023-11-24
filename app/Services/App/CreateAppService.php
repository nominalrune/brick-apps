<?php

namespace App\Services\App;

use Illuminate\Support\Facades\DB;
use App\Models\App;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;

class CreateAppService
{
    public function __construct()
    {
    }
    /**
     * @param string $name
     * @param string $description
     * @param array $form
     */
    public function createApp(string $code, string $name, string $description, string $icon, array $form, array $form_keys)
    {
        $app = App::create([
            'code' => $code,
            'name' => $name,
            'description' => $description,
            'icon' => $icon,
            'form' => $form,
            'form_keys'=>$form_keys,
        ]);
        Log::info('app created', ['app' => $app]);
        $connection = DB::connection(env('DB_CONNECTION'));
        if ($connection->getSchemaBuilder()->hasTable($code)) {
            throw new \Exception('table already exists' . "name:{$code}");
        }
        $connection->getSchemaBuilder()->create($code, function (Blueprint $table) use ($form) {
            $table->id();
            $table->timestamps();
            $table->foreignId('created_by')->nullable()->constrained('users')->onUpdate('restrict')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onUpdate('restrict')->onDelete('set null');
            foreach ($form as $inputs) {
                foreach ($inputs as $input) {
                    $code = $input['code'];
                    $valueType = $input['valueType'];
                    if ($valueType === 'reference') {
                        $table->foreignId($code)->nullable()->constrained($input['referringAppName'])->onUpdate('restrict')->onDelete('set null');
                        continue;
                    }
                    $this->declareColumn($table, $code, $valueType);
                }
            }
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
}
