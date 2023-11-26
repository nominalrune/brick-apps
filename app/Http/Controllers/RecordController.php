<?php

namespace App\Http\Controllers;

use App\Repository\Record\RecordRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\App;
use App\Models\Record;

class RecordController extends Controller
{
    public function index(Request $request, string $app_code)
    {
        $app = App::findByCode($app_code);

        $repository = new RecordRepository($app_code);
        $records = $repository->getAll();
        return Inertia::render("Record/Index", [
            "app" => $app,
            "records" => $records,
        ]);
    }
    public function show(Request $request, string $app_code, int $record_id)
    {
        $app = App::findByCode($app_code);
        $repository = new RecordRepository($app_code);
        $record = $repository->get($record_id);
        return Inertia::render("Record/Show", [
            "app" => $app,
            "record" => $record,
        ]);
    }
    public function create(Request $request, string $app_code)
    {

        $app = App::findByCode($app_code);
        return Inertia::render("Record/Create", [
            "app" => $app,
        ]);
    }
    public function store(Request $request, string $app_code)
    {
        $app = App::findByCode($app_code);
        $inputs = $request->only($app->form_keys);
        $repository = new RecordRepository($app_code);
        $id = $repository->create($inputs);
        $record = $repository->get($id);
        return to_route("record.show", [
            "app_code" => $app_code,
            "record_id" => $record->id,
        ]);
    }

    public function edit(Request $request, string $app_code, int $record_id)
    {
        // $app = App::findByCode($app_code);
        // $record = $app->records()->find($record_id);
        // return Inertia::render('Record/Edit',[
        //     "app" => $app,
        //     "record" => $record,
        // ]);
        return to_route("record.show", [
            "app_code" => $app_code,
            "record_id" => $record_id,
        ]);
    }
    public function update(Request $request, string $app_code, int $record_id)
    {
        $app = App::findByCode($app_code);
        $record = $app->records()->find($record_id);
        $inputs = $request->only($app->form_keys);
        $record->update($inputs);
        to_route("record.show", [
            "app_code" => $app_code,
            "record_id" => $record_id,
        ]);
    }
    public function destroy(Request $request, string $app_code, int $record_id)
    {
        $app = App::findByCode($app_code);
        $record = $app->records()->find($record_id);
        $record->deleteOrFail();
        return to_route("record.index", [
            "app_code" => $app->code
        ]);
    }
}
