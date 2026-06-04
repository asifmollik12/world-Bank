<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LoanPlan;
use Illuminate\Http\Request;

class LoanPlanController extends Controller
{
    public function index()
    {
        $plans = LoanPlan::where('is_active', true)->get();
        return response()->json($plans);
    }

    public function show($id)
    {
        $plan = LoanPlan::findOrFail($id);
        return response()->json($plan);
    }
}
