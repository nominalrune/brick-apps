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
			$table->foreignId('group_id')
				->constrained('groups')->onUpdate('cascade')->onDelete('cascade');
			$table->foreignId('target_id')
				->constrained('views')->onUpdate('cascade')->onDelete('cascade');
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
