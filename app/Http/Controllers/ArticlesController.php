<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Models\Category;
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
        $category = Category::get();
        return view("app",["title"=>"Blogs","category"=>$category]);
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

        $data = [];
        if ($request->statusCategory == "New" && Category::where(["title"=>$request->category])->get()->count()==0){
            $data = Category::create(["title"=>$request->category, "user_id"=>$request->user,  "description"=>""]);
        }

        Articles::create([
            'title'=>$request->title,
            'content'=>$request->content,
            'user'=>$request->user,
            'category'=>$category,
        ]);

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
