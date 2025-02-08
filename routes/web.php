<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->middleware('guest');
Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
Route::post('/store', [AuthController::class, 'store']);
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/logged-in-user', [AuthController::class, 'getLoggedInUser']);

Route::group(['middleware' => 'auth'], function() {
    
    
    
});
Route::get('/Home', function () {
    return Inertia::render('Home');
});
Route::get('/orders', function () {
    return Inertia::render('Orders');
});
Route::get('/addorder/{id}', function ($id) {
    // Pass the `id` as a prop to the React component
    return Inertia::render('AddOrder', [
        'id' => $id,  // Pass the ID as a prop
    ]);
});
Route::get('/getproducts', [ProductsController::class, 'getAllProduct']);
Route::get('/products', [ProductsController::class, 'getAllProduct']); // For fetching all products or by id
Route::post('/OrderStore', [OrderController::class, 'Orderstore']); // For fetching all products or by id
Route::post('/pay-pending-payment', [OrderController::class, 'payPendingPayment']); // For fetching all products or by id