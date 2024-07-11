<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up() : void
	{
		Schema::create('groups', function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table->string('code', 255)->unique();
			$table->string('name');
			$table->text('description');
			$table->foreignId('created_by')->nullable()->constrained('users')
				->onUpdate('cascade')->onDelete("set null");
			$table->foreignId('updated_by')->nullable()->constrained('users')
				->onUpdate('cascade')->onDelete("set null");
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down() : void
	{
		Schema::dropIfExists('groups');
	}
};
