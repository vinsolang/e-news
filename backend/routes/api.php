<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;

// Public routes for unauthenticated users
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// NEW: Socialite Routes
Route::get('/auth/{provider}/redirect', [AuthController::class, 'redirectToProvider']);
Route::get('/auth/{provider}/callback', [AuthController::class, 'handleProviderCallback']);

// Protected routes for authenticated users (requires a valid token)
Route::middleware('auth:sanctum')->group(function () {
    // This route is for getting the current user if needed
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Logout route
    Route::post('/logout', [AuthController::class, 'logout']);

   
});
 Route::apiResource('categories', CategoryController::class);
 Route::apiResource('news', NewsController::class);
