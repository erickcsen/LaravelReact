<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
// Route::get('/', function () {
//     $title="Welcome Page";
//     return view('app', ["title"=>$title, "pagename"=>"Welcome"]);
// });

Route::get('/', [DashboardController::class, "show"]);
