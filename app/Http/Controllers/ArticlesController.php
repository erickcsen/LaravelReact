<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\View\View;

use Illuminate\Support\Facades\Auth;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view("app",["title"=>"Master Article"]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view("app",["title"=>"Master Article"]);
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
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            "statusCategory"=>"nullable"
        ]);

        $data = [];
        if ($request->statusCategory == "New" && Category::where(["title"=>$request->category])->get()->count()==0){
            $data = Category::create(["title"=>$request->category, "user_id"=>$request->user,  "description"=>""]);
            $category = $data->id;
        } else {
            $category = Category::where(["id"=>$request->category])->orWhere(["title"=>$request->category])->get()[0]->id;
        }

        $path = $request->file('image')->store('images', 'public');

        Articles::create([
            'title'=>$request->title,
            'description'=>$request->content,
            'user_id'=>$request->user,
            'category_id'=>$category,
            'image_url'=>'storage/' . $path,
        ]);

        return redirect('/')->with('success', 'Insert Articles Successfull.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id, Articles $Articles)
    {
        return view("app",["title"=>"Master Article"]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Articles $Articles)
    {
        return view("app",["title"=>"Master Article"]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Articles $Articles)
    {

        $request->validate([
            "id"=>"required",
            "title"=>"required",
            "content"=>"required",
            "user"=>"required",
            "category"=>"required",
            'image' => 'image|mimes:jpg,jpeg,png,webp|max:5120',
            "statusCategory"=>"nullable"
        ]);

        $data = [];
        $category = "";
        if ($request->statusCategory == "New" && Category::where(["title"=>$request->category])->get()->count()==0){
            $data = Category::create(["title"=>$request->category, "user_id"=>$request->user,  "description"=>""]);
            $category = $data->id;
        } else {
            $category = Category::where(["id"=>$request->category])->orWhere(["title"=>$request->category])->get()[0]->id;
        }

        $path = "";
        if (($request->image == null) == false) $path = $request->file('image')->store('images', 'public');

        $data = Articles::findOrFail($request->id);
        $data->title = $request->title;
        $data->content = $request->content;
        $data->category_id = $category;
        if (($request->image == null) == false) $data->image_url = 'storage/' . $path;
        //$data->update();
        return $response->json(["message"=>"success update article"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Articles $Articles)
    {
        //
    }

    /**
     * List Articles with Authentication
     */
    public function listArticleWithAuthentication(Request $request){
        $id = $request->id;

        $data = [];
        $userID = Auth::user()->id;

        $data = Articles::where(["user_id"=>$userID]);
        if ($id!==null) $data->where(["id"=>$id]);
        return response()->json($data->paginate(10), 200);
    }
}
