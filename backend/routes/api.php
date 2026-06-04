<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LoanApplicationController;
use App\Http\Controllers\Api\LoanPlanController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\RepaymentController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\LoanManageController;
use App\Http\Controllers\Api\Admin\UserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Public loan plans
Route::get('/loan-plans',      [LoanPlanController::class, 'index']);
Route::get('/loan-plans/{id}', [LoanPlanController::class, 'show']);

// Authenticated user routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',          [AuthController::class, 'logout']);
    Route::get('/profile',          [AuthController::class, 'profile']);
    Route::post('/profile/update',  [AuthController::class, 'updateProfile']);
    Route::post('/profile/password',[AuthController::class, 'changePassword']);

    // Loan applications
    Route::get('/loans',       [LoanApplicationController::class, 'index']);
    Route::post('/loans',      [LoanApplicationController::class, 'store']);
    Route::get('/loans/{id}',  [LoanApplicationController::class, 'show']);

    // Repayments
    Route::get('/repayments',  [RepaymentController::class, 'index']);
    Route::post('/repayments', [RepaymentController::class, 'store']);

    // Notifications
    Route::get('/notifications',            [NotificationController::class, 'index']);
    Route::patch('/notifications/{id}/read',[NotificationController::class, 'markRead']);
    Route::post('/notifications/read-all',  [NotificationController::class, 'markAllRead']);

    // Admin routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index']);

        // Loan Plans CRUD
        Route::get('/loan-plans',         [LoanManageController::class, 'plans']);
        Route::post('/loan-plans',        [LoanManageController::class, 'storePlan']);
        Route::put('/loan-plans/{id}',    [LoanManageController::class, 'updatePlan']);
        Route::delete('/loan-plans/{id}', [LoanManageController::class, 'deletePlan']);

        // Applications management
        Route::get('/applications',              [LoanManageController::class, 'applications']);
        Route::get('/applications/{id}',         [LoanManageController::class, 'showApplication']);
        Route::patch('/applications/{id}/status',[LoanManageController::class, 'updateStatus']);

        // Repayments management
        Route::get('/repayments',                [LoanManageController::class, 'repayments']);
        Route::patch('/repayments/{id}/confirm', [LoanManageController::class, 'confirmRepayment']);

        // User management
        Route::get('/users',              [UserController::class, 'index']);
        Route::post('/users',             [UserController::class, 'store']);
        Route::get('/users/{id}',         [UserController::class, 'show']);
        Route::patch('/users/{id}/status',[UserController::class, 'updateStatus']);
        Route::delete('/users/{id}',      [UserController::class, 'destroy']);
    });
});
