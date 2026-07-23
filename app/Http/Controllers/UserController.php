<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class UserController extends Controller
{
    /**
     * Show Login
     */
    public function login(): View
    {
        return view("app", ["title"=>"Login","pagename"=>"Login"]);
    }

    /**
     * Show Register
     */
    public function register(): View
    {
        return view('app', ["title"=>"Register", "pagename"=>"Register"]);
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
