<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LoanApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'loan_plan_id', 'amount', 'duration_months',
        'interest_rate', 'total_payable', 'monthly_installment',
        'purpose', 'nid_document', 'income_proof',
        'status', 'admin_note', 'approved_at', 'disbursed_at',
    ];

    protected $casts = [
        'amount'              => 'float',
        'total_payable'       => 'float',
        'monthly_installment' => 'float',
        'interest_rate'       => 'float',
        'approved_at'         => 'datetime',
        'disbursed_at'        => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function loanPlan()
    {
        return $this->belongsTo(LoanPlan::class);
    }

    public function repayments()
    {
        return $this->hasMany(Repayment::class);
    }
}
