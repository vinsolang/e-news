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
        Schema::create('news', function (Blueprint $table) {
            $table->id();

            $table->string('image')->nullable();         // News image path
            $table->string('category_id');                  // Category name
            $table->string('type_news');                 // Breaking, Trending, etc.
            $table->string('title');                     // News title
            $table->string('caption')->nullable();       // Short caption
            $table->string('name_post');                 // Author name
            $table->time('time_red')->nullable();        // Time posted
            $table->unsignedBigInteger('view')->default(0); // View count
            $table->longText('description');             // Full description

            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
