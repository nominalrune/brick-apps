<?php

namespace Domain\App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\App;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;
use App\Repository\App\UserDefinedModelClassRepository;
use Repository\App\Column;

class UpdateAppService
{
    /**
     */
    public function updateApp(string $code, string $name, string $description, string $icon, array $form)
    {
        $app = App::findByCode($code);
        /** @var Collection<int,{code:string;type:string;valueType:string;label:string;prefix:string;suffix:string;defaultValue:mixed;referringAppCode:string;rules:array}> $originalColumns*/
        $originalColumns = collect($app->form)->flatten(1);
        /** @var Collection<int,{code:string;type:string;valueType:string;label:string;prefix:string;suffix:string;defaultValue:mixed;referringAppCode:string;rules:array}> $newColumns*/
        $form_keys = collect($form)->flatten(1)->map(fn ($i) => $i['code']);
        $newColumns = collect($form)->flatten(1);
        $columnsToAdd = $newColumns->whereNotIn('code', $originalColumns->pluck('code')->all());
        $columnsToChange = $newColumns->filter(function ($col) use ($originalColumns) {
            $item = $originalColumns->firstWhere('code', $col['code']);
            if (! $item) {
                return false;
            }
            return $item["valueType"] !== $col['valueType'];
        });
        // dd(["old"=>$originalColumns,"new"=>$newColumns, "add"=>$columnsToAdd, "change"=>$columnsToChange, "delete"=>$columnsToDelete]);
        $columnsToDelete = $originalColumns->whereNotIn('code', $newColumns->pluck('code')->all());
        $this->updateAppRecord($app, $name,$description, $icon, $form, $form_keys);

        $this->updateAppTable($code, $columnsToAdd, $columnsToChange, $columnsToDelete);
        Log::info('app updated', ['app' => $app]);
        return $app;
    }
	/**
	 * update app data on `apps` table
	 * TODO : move to repository
	 */
    private function updateAppRecord(App $app, string $name, string $description, string $icon, array $form, array $form_keys)
    {
        $app->update([
            'name' => $name,
            'description' => $description,
            'icon' => $icon,
            'form' => $form,
            'form_keys' => $form_keys,
        ]);
        return $app;
    }
	/**
	 * update user-defined-table on the running database
	 * TODO : move to repository
	 */
    private function updateAppTable(string $code, Collection $columnsToAdd, Collection $columnsToChange, Collection $columnsToDelete)
    {
        $connection = DB::connection(env('DB_CONNECTION'));
        if ($connection->getSchemaBuilder()->hasTable($code)) {
            throw new \Exception('table already exists' . "name:{$code}");
        }
        $connection->getSchemaBuilder()->table($code, function (Blueprint $table) use ($columnsToAdd, $columnsToChange, $columnsToDelete) {
            foreach ($columnsToAdd as $col) {
                $code = $col['code'];
                $valueType = $col['valueType'];
                Column::declareColumn($table, $code, $valueType, $col['refereingAppCode']);
            }
            foreach ($columnsToChange as $col) {
                $code = $col['code'];
                $valueType = $col['valueType'];
                Column::declareColumn($table, $code, $valueType, $col['refereingAppCode']);
            }
            $table->dropColumn($columnsToDelete->pluck('code')->all());
        });
    }

    private function updateUserDefinedModelClassFile(App $app)
    {
        $repository = new UserDefinedModelClassRepository($app);
        $repository->update();
    }

}
