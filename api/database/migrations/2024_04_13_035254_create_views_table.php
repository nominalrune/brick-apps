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
		Schema::create('views', function (Blueprint $table) {
			$table->id();
			$table->string('file')->unique();
			$table->timestamps();
			$table->foreignId('created_by')->nullable()
				->constrained('users')->onDelete('set null');
			$table->foreignId('updated_by')->nullable()
				->constrained('users')->onDelete('set null');
			$table->string('code', 255)->unique();
			$table->string('name', 255);
			$table->string('app_code', 255);
			$table->foreign('app_code')
				->references('code')->on('apps')
				->onUpdate('cascade')
				->onDelete('cascade');
		});
		Schema::table('apps', function (Blueprint $table) {
			$table->string('default_view', 255)->nullable();
			$table->foreign('default_view')
				->references('code')->on('views')
				->onUpdate('cascade')
				->onDelete('set null');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down() : void
	{
		Schema::dropIfExists('views');
		Schema::table('apps', function (Blueprint $table) {
			$table->dropForeign(['default_view']);
			$table->dropColumn('default_view');
		});
	}
};
