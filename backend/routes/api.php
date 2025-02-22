<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\socialAuthController;
use App\Http\Controllers\UsersContoller;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\SubtaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Public Routes
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/passowrd', 'sendResetLink');

    Route::post('/reset-password', 'reset');
});

Route::get('/login-google', [socialAuthController::class, 'redirectToProvider']);
Route::get('/auth/google/callback', [socialAuthController::class, 'handleCallback']);

// Protected Routes
Route::middleware('auth:api')->group(function () {
    // Users
    Route::controller(UsersContoller::class)->group(function () {
        Route::get('/user', 'authUser');
    });
    // Tasks 
    
Route::controller(TaskController::class)->group(function () {
        
Route::get('/tasks',  'index');
Route::get('/tasks/{id}', 'show');
Route::post('/task/add', 'store');
Route::put('/task/edit/{id}', 'update');
Route::delete('/task/{id}', 'destroy');
Route::get('/tasks/statistics', 'statistics');
    });

Route::controller(SubtaskController::class)->group(function () {
    Route::get('/tasks/{task}/subtasks', 'index');        
    Route::get('/tasks/{task}/subtasks/{id}', 'show');    
    Route::post('/tasks/{task}/subtasks', 'store');       
    Route::put('/tasks/{task}/subtasks/{id}', 'update'); 
    Route::delete('/tasks/{task}/subtasks/{id}', 'destroy'); 
});


    // Auth
    Route::get('/logout', [AuthController::class, 'logout']);
});
