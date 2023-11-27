<?php

namespace App\Http\Controllers;

use App\Services\App\UpdateAppService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\App\CreateAppService;
use Illuminate\Support\Facades\Log;
use App\Models\App;
use App\Http\Requests\AppUpdateRequest;

class AppController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render("App/Index", [
            "apps" => App::all(),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('App/Create');
    }

    public function preflightStore(Request $request)
    {
        // migrate --pretendみたいな結果を表示したい
        // https://qiita.com/luccafort/items/76d85742e35bfc8d8d05
        return response()->json(["sql" => "CREATE ..."], 200);
    }
    public function store(AppUpdateRequest $request)
    {
        $service = new CreateAppService();
        $app = $service->createApp($request->code, $request->name, $request->description ?? "", $request->icon, $request->form, $request->form_keys);
        return to_route("record.index", [
            "app_code" => $app->code
        ]);
    }
    public function edit(Request $request, string $app_code)
    {
        $app = App::where('code', $app_code)->first();
        return Inertia::render('App/Edit', [
            "app" => $app,
        ]);
    }
    public function update(AppUpdateRequest $request, string $app_code)
    {
        // dd(["req"=>$request->all()]);
        $service = new UpdateAppService();
        $app = $service->updateApp($request->code, $request->name, $request->description ?? "", $request->icon, $request->form, $request->form_keys);
        return to_route("record.index", [
            "app_code" => $app->code
        ]);
    }

    public function destroy(Request $request, string $app_code)
    {
        $app = App::findByCode($app_code);
        $service = new DeleteAppService();
        $service->delete($app);
        return;
    }

}
