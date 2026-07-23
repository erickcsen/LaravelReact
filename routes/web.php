<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

// Route::get('/', function () {
//     $title="Welcome Page";
//     return view('app', ["title"=>$title, "pagename"=>"Welcome"]);
// });

Route::get('/', [DashboardController::class, "show"]);

Route::middleware('guest')->group(function () {
    Route::get('/login', [UserController::class, "login"]);
    Route::get('/register', [UserController::class, "register"]);
    Route::post('/register', [UserController::class, "store"]);
});

Route::middleware('auth')->group(function () {
    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return redirect('/')->with('success','Sukses verifikasi email');
    })->middleware(['auth', 'signed'])->name('verification.verify');
});

Route::fallback(function () {
    return response()->view('app', ["title"=>"Page - Not Found", "pagename"=>"404"]);
});
