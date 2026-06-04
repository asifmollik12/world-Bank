<?php

namespace Database\Seeders;

use App\Models\LoanPlan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@worldbankgroup.com',
            'phone'    => '01700000000',
            'password' => Hash::make('admin123'),
            'role'     => 'admin',
            'status'   => 'active',
        ]);

        // Loan plans
        $plans = [
            [
                'name'            => 'Personal Loan',
                'description'     => 'Quick personal loan for your everyday needs with flexible repayment.',
                'minimum_amount'  => 10000,
                'maximum_amount'  => 300000,
                'interest_rate'   => 2.5,
                'duration_months' => 12,
                'is_active'       => true,
            ],
            [
                'name'            => 'Business Loan',
                'description'     => 'Grow your business with our flexible business financing solutions.',
                'minimum_amount'  => 50000,
                'maximum_amount'  => 2000000,
                'interest_rate'   => 2.0,
                'duration_months' => 24,
                'is_active'       => true,
            ],
            [
                'name'            => 'Home Loan',
                'description'     => 'Make your dream home a reality with our affordable home loan.',
                'minimum_amount'  => 200000,
                'maximum_amount'  => 10000000,
                'interest_rate'   => 1.5,
                'duration_months' => 120,
                'is_active'       => true,
            ],
            [
                'name'            => 'Education Loan',
                'description'     => 'Invest in your future with our education financing plan.',
                'minimum_amount'  => 20000,
                'maximum_amount'  => 500000,
                'interest_rate'   => 1.8,
                'duration_months' => 36,
                'is_active'       => true,
            ],
            [
                'name'            => 'Emergency Loan',
                'description'     => 'Fast approval for urgent financial needs.',
                'minimum_amount'  => 5000,
                'maximum_amount'  => 100000,
                'interest_rate'   => 3.0,
                'duration_months' => 6,
                'is_active'       => true,
            ],
        ];

        foreach ($plans as $plan) {
            LoanPlan::create($plan);
        }
    }
}
