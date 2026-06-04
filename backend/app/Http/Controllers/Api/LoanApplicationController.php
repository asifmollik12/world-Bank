<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LoanApplication;
use App\Models\LoanPlan;
use App\Models\Notification;
use Illuminate\Http\Request;

class LoanApplicationController extends Controller
{
    public function index(Request $request)
    {
        $applications = LoanApplication::with('loanPlan')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($applications);
    }

    public function store(Request $request)
    {
        $request->validate([
            'loan_plan_id'   => 'required|exists:loan_plans,id',
            'amount'         => 'required|numeric|min:1000',
            'duration_months'=> 'required|integer|min:1',
            'purpose'        => 'required|string|max:255',
            'nid_document'   => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'income_proof'   => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $plan = LoanPlan::findOrFail($request->loan_plan_id);

        if ($request->amount < $plan->minimum_amount || $request->amount > $plan->maximum_amount) {
            return response()->json([
                'message' => "Amount must be between {$plan->minimum_amount} and {$plan->maximum_amount}"
            ], 422);
        }

        // Calculate repayment
        $rate              = $plan->interest_rate / 100;
        $months            = $request->duration_months;
        $principal         = $request->amount;
        $totalPayable      = $principal + ($principal * $rate * $months);
        $monthlyInstallment = $totalPayable / $months;

        $nidPath    = null;
        $incomePath = null;

        if ($request->hasFile('nid_document')) {
            $nidPath = $request->file('nid_document')->store('documents', 'public');
        }
        if ($request->hasFile('income_proof')) {
            $incomePath = $request->file('income_proof')->store('documents', 'public');
        }

        $application = LoanApplication::create([
            'user_id'             => $request->user()->id,
            'loan_plan_id'        => $plan->id,
            'amount'              => $principal,
            'duration_months'     => $months,
            'interest_rate'       => $plan->interest_rate,
            'total_payable'       => round($totalPayable, 2),
            'monthly_installment' => round($monthlyInstallment, 2),
            'purpose'             => $request->purpose,
            'nid_document'        => $nidPath,
            'income_proof'        => $incomePath,
            'status'              => 'pending',
        ]);

        // Notify user
        Notification::create([
            'user_id' => $request->user()->id,
            'title'   => 'Loan Application Submitted',
            'message' => "Your loan application of ৳" . number_format($principal) . " has been submitted and is under review.",
            'type'    => 'info',
        ]);

        return response()->json([
            'message'     => 'Loan application submitted successfully',
            'application' => $application->load('loanPlan'),
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $application = LoanApplication::with(['loanPlan', 'repayments'])
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json($application);
    }
}
