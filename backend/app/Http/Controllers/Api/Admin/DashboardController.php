<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\LoanApplication;
use App\Models\Repayment;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers        = User::where('role', 'user')->count();
        $totalLoans        = LoanApplication::count();
        $pendingLoans      = LoanApplication::where('status', 'pending')->count();
        $approvedLoans     = LoanApplication::where('status', 'approved')->orWhere('status', 'disbursed')->count();
        $rejectedLoans     = LoanApplication::where('status', 'rejected')->count();
        $totalDisbursed    = LoanApplication::where('status', 'disbursed')->sum('amount');
        $totalRepayments   = Repayment::where('status', 'confirmed')->sum('amount');
        $pendingRepayments = Repayment::where('status', 'pending')->count();

        $monthlyLoans = LoanApplication::selectRaw("strftime('%m', created_at) as month, COUNT(*) as count, SUM(amount) as total")
            ->whereRaw("created_at >= date('now', '-6 months')")
            ->groupByRaw("strftime('%m', created_at)")
            ->orderByRaw("strftime('%m', created_at)")
            ->get();

        $recentApplications = LoanApplication::with('user', 'loanPlan')
            ->latest()
            ->take(10)
            ->get();

        return response()->json([
            'stats' => [
                'total_users'        => $totalUsers,
                'total_loans'        => $totalLoans,
                'pending_loans'      => $pendingLoans,
                'approved_loans'     => $approvedLoans,
                'rejected_loans'     => $rejectedLoans,
                'total_disbursed'    => $totalDisbursed,
                'total_repayments'   => $totalRepayments,
                'pending_repayments' => $pendingRepayments,
            ],
            'monthly_loans'       => $monthlyLoans,
            'recent_applications' => $recentApplications,
        ]);
    }
}
