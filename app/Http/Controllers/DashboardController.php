<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    /**
     * Show Page
     */
    public function show():View
    {
        return view("app", ["title"=>"Home Page","pagename"=>"Dashboard"]);
    }
}
