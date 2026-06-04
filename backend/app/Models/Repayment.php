<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Repayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'loan_application_id', 'user_id', 'amount',
        'transaction_id', 'payment_method', 'status',
        'due_date', 'paid_at', 'note',
    ];

    protected $casts = [
        'amount'  => 'float',
        'due_date'=> 'date',
        'paid_at' => 'datetime',
    ];

    public function loanApplication()
    {
        return $this->belongsTo(LoanApplication::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
