<?php

use App\Http\Controllers\CreditCardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Criando rotas CRUD de clientes com controller de Cliente
Route::apiResource('customers', CustomerController::class);

//Criando rotas CRUD de cartãos com controller de Cartão de Crédito
Route::apiResource('creditcards', CreditCardController::class);