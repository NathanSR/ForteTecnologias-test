<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request) //rota: GET /customers
    {
        try{
            $limit = $request->query('limit', 5); //Limite de linhas para paginação

            $customersDB = Customer::query() //Pegar todos os clientes...
                ->where('fullName', 'like', '%'.$request->query('filter').'%') //...onde nome completo contêm o valor do filtro...
                ->paginate($limit); //...e criar paginação com o limite de retorno de dados por requisição
            
            return response()->json($customersDB->items(), 200); //Retornar os itens filtrados e paginados

        }catch(\Exception $e) { 
            return response()->json(["message"=> $e->getMessage()], 500);
        }
    }

    public function store(Request $request) //rota: POST /customers
    {
        try {
            $validatedData = $request->validate([
                'firstName' => 'required|string|max:100',
                'lastName' => 'required|string|max:100',
                'email' => 'required|email|unique:customers,email',
                'birthdate' => 'required|date|before:today',
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:255',
            ]);

            $validatedData['fullName'] = $validatedData['firstName'].' '.$validatedData['lastName'];

            Customer::create($validatedData);

            return response()->json(["message"=>"Dados cadastrado com sucesso!"], 201);

        } catch(\Exception $e) {
            return response()->json(["message"=> $e->getMessage()], 500);
        }
    }

    public function show(string $id) //rota: GET /customer/{id}
    {
        try{
            $customerDB = Customer::findOrFail($id);
            return response()->json($customerDB, 200);

        }catch(\Exception $e) { 
            return response()->json(["message"=> $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id) //rota: PUT /customer/{id}
    {
        try{
            $validatedData = $request->validate([
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|email|unique:customers,email,' . $id,
                'birthdate' => 'required|date',
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:255',
            ]);
        
            $validatedData['fullName'] = $validatedData['firstName'] . ' ' . $validatedData['lastName'];
        
            $customerDB = Customer::findOrFail($id);
            $customerDB->update($validatedData);

            return response()->json(["message"=>"Dados atualizados com sucesso!"], 200);

        }catch(\Exception $e) {
            return response()->json(["message"=> $e->getMessage()], 500);
        }
    }

    public function destroy(string $id) //rota: DELETE /customer/{id}
    {
        try{
            Customer::destroy($id);
            return response()->json(["message"=>"Dados deletados com sucesso!"], 200);

        }catch(\Exception $e) { 
            return response()->json(["message"=> $e->getMessage()], 500);
        }
    }
}
