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
		Schema::create('app_permissions', function (Blueprint $table) {
			$table->id();
			$table->string('group_code', 255);
			$table->string('app_code', 255);
			$table->foreign('group_code')
				->references('code')->on('groups')
				->onUpdate('cascade')->onDelete('cascade');
			$table->foreign('app_code')
				->references('code')->on('apps')
				->onUpdate('cascade')->onDelete('cascade');
			$table->integer('permission');
		});
	}
	/**
	 * Reverse the migrations.
	 */
	public function down() : void
	{
		Schema::dropIfExists('app_permissions');
	}
};
