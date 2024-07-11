<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Group;

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
		$userParam = $request->only(['email', 'password']);
		$user = User::create($userParam);
		if ($request->filled('profile')) {
			$profileParam = collect($request->only(['profile'])['profile'])->merge(['user_id' => $user->id])->toArray();
			$user->profile()->create($profileParam);
		}
		if($request->filled('groups')){
			$request->groups->each(function($groupId) use ($user){
				$user->groups()->attach($groupId);
			});
		}
		$group = Group::create([
			'code' => "user-{$user->id}",
			'name' => $request->string('name'),
			'description' => $request->string('description'),
		]);
		$user->groups()->attach($group->id);
		return response()->json($user);
	}
	public function update(UserUpdateRequest $request, int $id)
	{
		$user = User::findOrFail($id);
		$userParam = $request->only(['email']);
		$user = User::create($userParam);
		if ($request->filled('profile')) {
			$profileParam = collect($request->only(['profile'])['profile'])->toArray();
			$user->profile()->update($profileParam);
		}
		if($request->filled('groups')){
			$request->groups->each(function($groupId) use ($user){
				$user->groups()->attach($groupId);
			});
		}
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
