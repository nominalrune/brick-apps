<?php

namespace App\Http\Controllers;

use App\Repository\Record\RecordRepository;
use Illuminate\Http\Request;
use App\Models\App;
use App\Models\Record;
use Illuminate\Support\Facades\Log;

class RecordController extends Controller
{
	public function index(Request $request, string $app_code, ?string $view_code = null)
	{
		$app = App::findByCode($app_code)->withView($view_code);
		Log::info('records index', ['app' => $app]);
		$records = $app->records;
		return response()->json([
			"app" => $app,
			"records" => $records,
		]);
	}
	public function show(Request $request, string $app_code, string $view_code, int $record_id)
	{
		$app = App::findByCode($app_code);
		$repository = new RecordRepository($app_code);
		$record = $repository->get($record_id);
		return response()->json([
			"app" => $app,
			"record" => $record,
		]);
	}
	public function store(Request $request, string $app_code)
	{
		$app = App::findByCode($app_code);
		$inputs = $request->only($app->form_keys);
		$repository = new RecordRepository($app);
		$id = $repository->create($inputs);
		$record = $repository->get($id);
		return to_route("record.show", [
			"app_code" => $app_code,
			"record_id" => $record->id,
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
