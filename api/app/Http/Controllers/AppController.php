<?php

namespace App\Http\Controllers;

use App\Services\App\UpdateAppService;
use App\Services\App\DeleteAppService;
use Illuminate\Http\Request;
use App\Services\App\CreateAppService;
use Illuminate\Support\Facades\Log;
use App\Models\App;
use App\Http\Requests\App\UpdateRequest;
use App\Http\Requests\App\StoreRequest;

class AppController extends Controller
{
	public function index(Request $request)
	{
		// $apps = App::withCount("records")->get();
		$apps = App::all();
		return response()->json($apps);
	}


	public function preflightStore(Request $request)
	{
		// migrate --pretendみたいな結果を表示したい
		// https://qiita.com/luccafort/items/76d85742e35bfc8d8d05
		return response()->json(["sql" => "CREATE ..."], 200);
	}
	public function store(StoreRequest $request)
	{
		$service = new CreateAppService();
		$app = $service->createApp(
			$request->code,
			$request->name,
			$request->description ?? "",
			$request->icon,
			$request->columns,
			$request->defaultView,
			$request->user()
		);
		return response()->json($app);
	}
	public function update(UpdateRequest $request, string $app_code)
	{
		// dd(["req"=>$request->all()]);
		$service = new UpdateAppService();
		$app = $service->updateApp(
			$request->code,
			$request->name,
			$request->description ?? "",
			$request->icon,
			$request->columns,
			$request->defaultView,
		);
		return response()->json($app);
	}

	public function destroy(Request $request, string $app_code)
	{
		$app = App::findByCode($app_code);
		$service = new DeleteAppService();
		$service->delete($app);
		return;
	}

}
