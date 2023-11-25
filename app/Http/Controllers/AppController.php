<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\App\CreateAppService;
use Illuminate\Support\Facades\Log;
use App\Models\App;

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
    public function store(Request $request)
    {
        $service = new CreateAppService();
        $app = $service->createApp($request->code, $request->name, $request->description ?? "", $request->icon, $request->form, $request->form_keys);
        return to_route("record.index", [
            "app_id" => $app->id
        ]);
    }
    public function edit(Request $request, string $app_code)
    {
        $app=App::where('app_code', $app_code)->first();
        return Inertia::render('App/Edit',[
            "app" => $app,
        ]);
    }
    public function update(Request $request, string $app_code)
    {

    }
    public function destroy(Request $request)
    {

    }

}
