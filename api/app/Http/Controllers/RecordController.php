<?php

namespace App\Http\Controllers;

use App\Repository\Record\RecordRepository;
use Illuminate\Http\Request;
use App\Models\App;
use Illuminate\Http\JsonResponse;

class RecordController extends Controller
{
	/**
	 * @return JsonResponse&array{code:string,view:\App\Models\View,records:array{id:int}[]}
	 */
	public function index(Request $request, string $app_code, ?string $view_code = null)
	{
		$app = App::findByCode($app_code)->withView($view_code);
		$records = $app->records;
		return response()->json($app);
	}
	/**
	 * 
	 * @param \Illuminate\Http\Request $request
	 * @param string $app_code
	 * @param string $view_code
	 * @param int $record_id
	 * @return JsonResponse&array{app:App,record:array{id:int}}
	 */
	public function show(Request $request, string $app_code, string $view_code, int $record_id)
	{
		$app = App::findByCode($app_code)->withView($view_code);
		$repository = new RecordRepository($app);
		$record = $repository->get($record_id);
		return response()->json([
			"app" => $app,
			"record" => $record,
		]);
	}
	/**
	 * store
	 *
	 * save request data to database
	 * @param \Illuminate\Http\Request $request
	 * @param string $app_code
	 * @param ?string $view_code
	 * @return JsonResponse|array{id:int}
	 */
	public function store(Request $request, string $app_code, string $view_code = null)
	{
		$app = App::findByCode($app_code);

		$inputs = $request->only(collect($app->columns)->pluck('code'));
		$record = $app->recordClass::create($inputs);

		return response()->json($record);
	}

	/**
	 * update
	 *
	 * update record with requested data
	 * @param \Illuminate\Http\Request $request
	 * @param string $app_code
	 * @param int $record_id
	 * @return JsonResponse&array{id:int}
	 */
	public function update(Request $request, string $app_code, int $record_id)
	{
		$app = App::findByCode($app_code);
		$record = $app->records()->find($record_id);
		$inputs = $request->only(collect($app->columns)->pluck('code'));
		$record->update($inputs);
		return response()->json($record);
	}
	public function destroy(Request $request, string $app_code, int $record_id)
	{
		$app = App::findByCode($app_code);
		$record = $app->records()->find($record_id);
		$record->deleteOrFail();
		return response('deleted', 204);
	}
}
