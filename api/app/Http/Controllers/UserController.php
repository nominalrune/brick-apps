<?php

namespace App\Http\Controllers;

use App\Providers\RouteServiceProvider;
use Auth;
use Illuminate\Http\Request;
use App\Models\App;
use App\Models\User;

use App\Http\Requests\Auth\LoginRequest;

class UserController extends Controller
{
	public function index(Request $request)
	{
		$users = User::all();
		return response()->json($users);
	}
	public function store(Request $request)
	{
		$user = User::create($request->validated());
		return response()->json($user);
	}
	public function show(Request $request, int $id)
	{
		$user = User::findOrFail($id);
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
