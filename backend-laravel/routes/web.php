<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::resource("customers", CustomerController::class);

// Route::apiResource("customers", CustomerController::class)->group(function () {
//     Route::get('/customers/{id}', 'show');
//     Route::post('/customers', 'store');
//     Route::get('/customers', 'index');
// });
