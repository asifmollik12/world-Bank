<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LoanApplication;
use App\Models\Notification;
use App\Models\Repayment;
use Illuminate\Http\Request;

class RepaymentController extends Controller
{
    public function index(Request $request)
    {
        $repayments = Repayment::with('loanApplication')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($repayments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'loan_application_id' => 'required|exists:loan_applications,id',
            'amount'              => 'required|numeric|min:1',
            'transaction_id'      => 'required|string',
            'payment_method'      => 'required|string',
        ]);

        $application = LoanApplication::where('user_id', $request->user()->id)
            ->where('status', 'disbursed')
            ->findOrFail($request->loan_application_id);

        $repayment = Repayment::create([
            'loan_application_id' => $application->id,
            'user_id'             => $request->user()->id,
            'amount'              => $request->amount,
            'transaction_id'      => $request->transaction_id,
            'payment_method'      => $request->payment_method,
            'status'              => 'pending',
            'due_date'            => now()->addMonth(),
        ]);

        Notification::create([
            'user_id' => $request->user()->id,
            'title'   => 'Repayment Submitted',
            'message' => "Your repayment of ৳" . number_format($request->amount) . " is pending confirmation.",
            'type'    => 'info',
        ]);

        return response()->json([
            'message'   => 'Repayment submitted successfully',
            'repayment' => $repayment,
        ], 201);
    }
}
