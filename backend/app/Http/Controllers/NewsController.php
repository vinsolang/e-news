<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::with('category')->get();

        return response()->json($news, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'caption' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'type_news' => 'required|string',
            'name_post' => 'required|string|max:255',
            'time_red' => 'nullable|string',
            'view' => 'nullable|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $name = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images/news'), $name);
            $data['image'] = "images/news/$name";
        }

        $news = News::create($data);

        return response()->json($news, 201);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'caption' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'type_news' => 'required|string',
            'name_post' => 'required|string|max:255',
            'time_red' => 'nullable|string',
            'view' => 'nullable|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $name = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images/news'), $name);
            $data['image'] = "images/news/$name";
        }

        $news->update($data);

        return response()->json($news);
    }

    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();

        return response()->json(['message' => 'News deleted'], 200);
    }
}
