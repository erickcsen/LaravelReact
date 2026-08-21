<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view("app",["title"=>"Blogs"]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view("app",["title"=>"Blogs"]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "title"=>"required",
            "content"=>"required",
            "user"=>"required",
            "category"=>"required",
            "statusCategory"=>"nullable"
        ]);

        return response()->json("success information", 200);

        // Articles::create([
        //     'title'=>$request->title,
        //     'content'=>$request->content,
        //     'user'=>$request->user,
        //     'category'=>$request->category,
        //     'statusCategory'=>$request->statusCategory,
        // ]);

        return redirect('/')->with('success', 'Insert Articles Successfull.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Articles $Articles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Articles $Articles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Articles $Articles)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Articles $Articles)
    {
        //
    }
}
