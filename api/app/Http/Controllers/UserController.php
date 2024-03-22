<?php

namespace App\Http\Controllers;

use App\Providers\RouteServiceProvider;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Http\Requests\Auth\LoginRequest;

class UserController extends Controller
{
    public function show()
    {
        return Inertia::render('User/Show', []);
    }
    public function showLogin()
    {
        return Inertia::render('Auth/Login', []);
    }
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        if ($request->expectsJson()) {
            return response()->json(Auth::user());
        }
        return redirect()->intended(RouteServiceProvider::HOME);
    }

}
