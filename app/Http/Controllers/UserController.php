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
}
