<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'number',
        'expiration_date',
        'cvv',
    ];

    public function customer() //Para acessar cliente associado a um cartão
    {
        return $this->belongsTo(Customer::class);
    }
}
