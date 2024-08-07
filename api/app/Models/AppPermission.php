<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AppPermission
 */
class AppPermission extends PermissionBase
{
	use HasFactory;
	protected $hidden = [
		'id',
		'created_at',
		'updated_at',
	];
	public function app()
	{
		return $this->belongsTo(App::class, 'app_code', 'code');
	}
}
