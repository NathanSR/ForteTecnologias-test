<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstName', 'lastName', 'email', 'birthdate', 'fullName', 'phone', 'address'
    ];

    public function creditCards() //Permite acessar todos os cartões associados a um cliente
    {
        return $this->hasMany(CreditCard::class);
    }
}
