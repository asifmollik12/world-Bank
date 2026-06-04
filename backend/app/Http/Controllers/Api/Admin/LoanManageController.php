<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\LoanApplication;
use App\Models\LoanPlan;
use App\Models\Notification;
use App\Models\Repayment;
use Illuminate\Http\Request;

class LoanManageController extends Controller
{
    // --- Loan Plans ---
    public function plans()
    {
        return response()->json(LoanPlan::latest()->get());
    }

    public function storePlan(Request $request)
    {
        $request->validate([
            'name'            => 'required|string',
            'minimum_amount'  => 'required|numeric',
            'maximum_amount'  => 'required|numeric|gt:minimum_amount',
            'interest_rate'   => 'required|numeric|min:0',
            'duration_months' => 'required|integer|min:1',
            'description'     => 'nullable|string',
        ]);

        $plan = LoanPlan::create($request->all());
        return response()->json(['message' => 'Plan created', 'plan' => $plan], 201);
    }

    public function updatePlan(Request $request, $id)
    {
        $plan = LoanPlan::findOrFail($id);
        $plan->update($request->all());
        return response()->json(['message' => 'Plan updated', 'plan' => $plan]);
    }

    public function deletePlan($id)
    {
        LoanPlan::findOrFail($id)->delete();
        return response()->json(['message' => 'Plan deleted']);
    }

    // --- Loan Applications ---
    public function applications(Request $request)
    {
        $query = LoanApplication::with('user', 'loanPlan')->latest();

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return response()->json($query->paginate(15));
    }

    public function showApplication($id)
    {
        $app = LoanApplication::with('user', 'loanPlan', 'repayments')->findOrFail($id);
        return response()->json($app);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status'     => 'required|in:under_review,approved,rejected,disbursed,completed',
            'admin_note' => 'nullable|string',
        ]);

        $app = LoanApplication::findOrFail($id);
        $app->status     = $request->status;
        $app->admin_note = $request->admin_note;

        if ($request->status === 'approved') {
            $app->approved_at = now();
        }
        if ($request->status === 'disbursed') {
            $app->disbursed_at = now();
        }

        $app->save();

        // Notify user
        $messages = [
            'approved'     => "Your loan application of ৳" . number_format($app->amount) . " has been approved!",
            'rejected'     => "Your loan application of ৳" . number_format($app->amount) . " has been rejected.",
            'disbursed'    => "৳" . number_format($app->amount) . " has been disbursed to your account!",
            'under_review' => "Your loan application is now under review.",
            'completed'    => "Your loan has been marked as completed. Thank you!",
        ];

        Notification::create([
            'user_id' => $app->user_id,
            'title'   => 'Loan Status Updated',
            'message' => $messages[$request->status] ?? 'Your loan status has been updated.',
            'type'    => in_array($request->status, ['approved', 'disbursed']) ? 'success' :
                         ($request->status === 'rejected' ? 'danger' : 'info'),
        ]);

        return response()->json(['message' => 'Status updated', 'application' => $app]);
    }

    // --- Repayments ---
    public function repayments(Request $request)
    {
        $repayments = Repayment::with('user', 'loanApplication')->latest()->paginate(15);
        return response()->json($repayments);
    }

    public function confirmRepayment($id)
    {
        $repayment = Repayment::findOrFail($id);
        $repayment->update(['status' => 'confirmed', 'paid_at' => now()]);

        Notification::create([
            'user_id' => $repayment->user_id,
            'title'   => 'Repayment Confirmed',
            'message' => "Your repayment of ৳" . number_format($repayment->amount) . " has been confirmed.",
            'type'    => 'success',
        ]);

        return response()->json(['message' => 'Repayment confirmed']);
    }
}
