<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
	public function index(Request $request) : Response
	{
		$user = $request->user();
		$user->load('profile');
		return $user;
	}

	/**
	 * Handle an incoming authentication request.
	 */
	public function store(LoginRequest $request) : JsonResponse
	{
		$request->authenticate();

		$request->session()->regenerate();
		/** @var \App\Models\User */
		$user = $request->user();
		return response()->json($user);
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request) : RedirectResponse
	{
		Auth::guard('web')->logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		return redirect('/');
	}
}
