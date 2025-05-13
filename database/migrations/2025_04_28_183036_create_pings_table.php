<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pings', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->text('url');
            $table->enum('interval', [
                '60',
                '120',
                '180',
                '240',
                '300',
                '600',
                '900',
                '1800',
                '2700',
                '3600',
                '7200',
                '10800',
                '21600',
                '43200',
                '86400'
            ]);
            $table->boolean('active')->default(true);

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pings');
    }
};
