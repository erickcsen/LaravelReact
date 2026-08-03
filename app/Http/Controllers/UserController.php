<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Show Login
     */
    public function login(): View
    {
        return view("app", ["title"=>"Login"]);
    }

    /**
     * Execute Sign In
     */
    public function signIn(Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return ["message"=>"Login berhasil"];
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ])->onlyInput('email');

        /** */
    }

    /**
     * Show Register
     */
    public function register(): View
    {
        return view('app', ["title"=>"Register"]);
    }

    /**
     * Save User
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->sendEmailVerificationNotification();

        return redirect('/login')->with('success', 'Register berhasil.');
    }
}
