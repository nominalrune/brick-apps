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
		Schema::create('view_permissions', function (Blueprint $table) {
			$table->id();
			$table->string('group_code', 255);
			$table->string('view_code', 255);
			$table->foreign('group_code')
				->references('code')->on('groups')
				->onUpdate('cascade')->onDelete('cascade');
			$table->foreign('view_code')
				->references('code')->on('views')
				->onUpdate('cascade')->onDelete('cascade');
			$table->integer('permission');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down() : void
	{
		Schema::dropIfExists('view_permissions');
	}
};
