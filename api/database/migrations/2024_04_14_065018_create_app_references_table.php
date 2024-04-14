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
		Schema::create('app_references', function (Blueprint $table) {
			$table->id();
			$table->string('parent_code', 255);
			$table->string('target_code', 255);
			$table->foreign('parent_code')
				->references('code')->on('apps')
				->onUpdate('cascade')->onDelete('cascade');
			$table->foreign('target_code')
				->references('code')->on('apps')
				->onUpdate('cascade')->onDelete('restrict');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down() : void
	{
		Schema::dropIfExists('app_references');
	}
};
