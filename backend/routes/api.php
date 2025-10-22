<?php

use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/api/news', [NewsController::class, 'news']);