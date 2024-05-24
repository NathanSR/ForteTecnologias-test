<?php

namespace App\Http\Controllers;

use App\Models\CreditCard;
use Illuminate\Http\Request;

class CreditCardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try{
            $customerId = $request->query('customer_id');

            if ($customerId) {
                $request->validate(['customer_id' => 'exists:customers,id']);
                $creditCards = CreditCard::where('customer_id', $customerId)->get();
            } else {
                $creditCards = CreditCard::all();
            }
    
            return response()->json($creditCards, 200);
        }catch(\Exception $e){  
            return response()->json(["message"=> $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) //rota: POST /customers
    {
        try {
            $validatedData = $request->validate([
                'customer_id' => 'required|exists:customers,id',
                'number' => 'required|string|max:19',
                'expiration_date' => 'required|date|after:today',
                'cvv' => 'required|string|max:4',
            ]);

            CreditCard::create($validatedData);

            return response()->json(["message"=>"Dados cadastrado com sucesso!"], 201);

        } catch(\Exception $e) {
            return response()->json(["message"=> $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $creditCardDB = CreditCard::findOrFail($id);
            return response()->json($creditCardDB, 200);

        }catch(\Exception $e) { 
            return response()->json(["message"=> $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $validatedData = $request->validate([
                'number' => 'sometimes|required|string|max:19',
                'expiration_date' => 'sometimes|required|date|after:today',
                'cvv' => 'sometimes|required|string|max:4',
            ]);
        
            $creditCardDB = CreditCard::findOrFail($id);
            $creditCardDB->update($validatedData);

            return response()->json(["message"=>"Dados atualizados com sucesso!"], 200);

        }catch(\Exception $e) {
            return response()->json(["message"=> $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            CreditCard::destroy($id);
            return response()->json(["message"=>"Dados deletados com sucesso!"], 200);

        }catch(\Exception $e) { 
            return response()->json(["message"=> $e->getMessage()], 500);
        }
    }
}
