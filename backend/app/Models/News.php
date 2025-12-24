<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = 'news'; // change 'new' → 'news' if your table is 'news'

    protected $fillable = [
        'image',
        'category_id',
        'type_news',
        'title',
        'caption',
        'name_post',
        'time_red',
        'view',
        'description',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    // In App\Models\News.php
    public function getImageAttribute($value)
    {
        return $value ? asset($value) : null;
    }
}
