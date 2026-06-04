<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->unique()->after('email');
            $table->string('nid')->nullable()->after('phone');
            $table->string('address')->nullable()->after('nid');
            $table->string('profile_photo')->nullable()->after('address');
            $table->enum('role', ['user', 'admin'])->default('user')->after('profile_photo');
            $table->enum('status', ['active', 'inactive', 'banned'])->default('active')->after('role');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'nid', 'address', 'profile_photo', 'role', 'status']);
        });
    }
};
