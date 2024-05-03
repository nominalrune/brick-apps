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
		Schema::create('profiles', function (Blueprint $table) {
			$table->foreignId('user_id')->primary()->constrained('users')
				->onUpdate('cascade')->onDelete('cascade');
			$table->timestamps();
			$table->string('name', 255);
			$table->text('description')->nullable();
			$table->string('avatar', 255)->nullable();
			$table->dateTime('archived_at')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down() : void
	{
		Schema::dropIfExists('profiles');
	}
};
