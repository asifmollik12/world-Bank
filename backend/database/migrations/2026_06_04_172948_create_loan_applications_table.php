<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loan_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('loan_plan_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 15, 2);
            $table->integer('duration_months');
            $table->decimal('interest_rate', 5, 2);
            $table->decimal('total_payable', 15, 2);
            $table->decimal('monthly_installment', 15, 2);
            $table->string('purpose');
            $table->string('nid_document')->nullable();
            $table->string('income_proof')->nullable();
            $table->enum('status', ['pending', 'under_review', 'approved', 'rejected', 'disbursed', 'completed'])->default('pending');
            $table->text('admin_note')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('disbursed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loan_applications');
    }
};
