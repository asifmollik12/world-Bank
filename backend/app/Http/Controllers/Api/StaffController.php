<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LoanApplication;
use App\Models\Repayment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    // Search user by phone
    public function searchUser(Request $request)
    {
        $phone = $request->query('phone', '');
        if (!$phone) {
            return response()->json(['user' => null, 'message' => 'Phone required'], 422);
        }

        $user = User::where('phone', $phone)
            ->orWhere('phone', 'like', "%{$phone}%")
            ->first();

        if (!$user) {
            return response()->json(['user' => null, 'message' => 'User not found'], 404);
        }

        $loans = LoanApplication::with('loanPlan')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        $repayments = Repayment::where('user_id', $user->id)->latest()->get();

        return response()->json([
            'user'       => $user,
            'loans'      => $loans,
            'repayments' => $repayments,
        ]);
    }

    // Update user info by staff
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $allowed = ['name', 'status', 'address'];
        $user->fill($request->only($allowed));
        $user->save();

        return response()->json(['message' => 'Updated', 'user' => $user]);
    }

    // Update loan status by staff
    public function updateLoan(Request $request, $id)
    {
        $loan = LoanApplication::findOrFail($id);
        if ($request->has('status'))     $loan->status     = $request->status;
        if ($request->has('admin_note')) $loan->admin_note = $request->admin_note;
        $loan->save();
        return response()->json(['message' => 'Loan updated', 'loan' => $loan]);
    }
}
