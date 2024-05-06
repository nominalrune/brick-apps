<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Providers\RouteServiceProvider;
use Auth;
use Illuminate\Http\Request;
use App\Models\App;
use App\Models\User;

class UserController extends Controller
{
	public function index(Request $request)
	{
		$users = User::all();
		return response()->json($users);
	}
	public function show(Request $request, int $id)
	{
		$user = User::findOrFail($id);
		return response()->json($user);
	}
	public function store(UserStoreRequest $request)
	{
		$user = User::create($request->validated());
		return response()->json($user);
	}
	public function update(Request $request, int $id)
	{
		$user = User::findOrFail($id);
		$user->update($request->validated());
		return response()->json($user);
	}
	public function archive(Request $request, int $id)
	{
		$user = User::findOrFail($id);
		$user->delete();
		return response(status: 204);
	}
	public function destroy(Request $request, int $id)
	{
		$user = User::findOrFail($id);
		$user->forceDelete();
		return response(status: 204);
	}
}
