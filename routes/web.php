<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;

// Route::get('/', function () {
//     $title="Welcome Page";
//     return view('app', ["title"=>$title, "pagename"=>"Welcome"]);
// });

Route::middleware('guest')->group(function () {
    Route::get('/', [DashboardController::class, "show"]);
    Route::get('/login', [UserController::class, "login"]);
    Route::get('/register', [UserController::class, "register"]);
});

Route::fallback(function () {
    return response()->view('app', ["title"=>"Page - Not Found", "pagename"=>"404"]);
});
