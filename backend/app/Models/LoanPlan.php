<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LoanPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'minimum_amount',
        'maximum_amount', 'interest_rate', 'duration_months', 'is_active',
    ];

    protected $casts = [
        'is_active'      => 'boolean',
        'minimum_amount' => 'float',
        'maximum_amount' => 'float',
        'interest_rate'  => 'float',
    ];

    public function loanApplications()
    {
        return $this->hasMany(LoanApplication::class);
    }
}
