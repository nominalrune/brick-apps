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
		Schema::create('apps', function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table->dateTime('archived_at')->nullable();
			$table->foreignId('created_by')->nullable()
				->constrained('users')->onUpdate('cascade')->onDelete('set null');
			$table->foreignId('updated_by')->nullable()
				->constrained('users')->onUpdate('cascade')->onDelete('set null');
			$table->string('code', 255)->unique();
			$table->string('name', 255);
			$table->string('icon', 255);
			$table->text('description');
			$table->json('colunms');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down() : void
	{
		Schema::table('apps', function (Blueprint $table) {
			$table->dropForeign(['created_by']);
			$table->dropForeign(['updated_by']);
		});
		Schema::dropIfExists('apps');
	}
};
