<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ArticlesController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Route::get('/', function () {
//     $title="Welcome Page";
//     return view('app', ["title"=>$title, "pagename"=>"Welcome"]);
// });

Route::get('/', [DashboardController::class, "show"]);

Route::middleware('guest')->group(function () {
    Route::get('/login', [UserController::class, "login"])->name("login");
    Route::post('/signIn', [UserController::class,'signIn']);
    Route::get('/register', [UserController::class, "register"]);
    Route::post('/register', [UserController::class, "store"]);
    Route::get('/forgot-password', [UserController::class, "forgotPassword"]);
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendNotification']);
    Route::get('/reset-password/{token}', [ForgotPasswordController::class, 'resetPasswordPage'])->name('password.reset');
    Route::post('/reset-password', [ForgotPasswordController::class, 'resetPasswordExecute']);
});

Route::middleware('auth')->group(function () {
    Route::resource('/master-articles', ArticlesController::class);
    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return redirect('/')->with('success','Sukses verifikasi email');
    })->middleware(['auth', 'signed'])->name('verification.verify');
});

Route::get('/auth/check', function () {
    return response()->json([
        'authenticated' => Auth::check(),
        'user' => Auth::user(),
    ]);
});

Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logOut']);

Route::fallback(function () {
    return response()->view('app', ["title"=>"Page - Not Found", "pagename"=>"404"]);
});
