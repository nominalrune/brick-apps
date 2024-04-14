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
	public function target()
	{
		return $this->belongsTo(App::class);
	}
}
