<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';

    protected $fillable = [
        'category_name',
    ];

    public function news()
    {
        return $this->hasMany(News::class, 'category_id');
    }
}
