<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\ViewPermission
 */
class ViewPermission extends PermissionBase
{
	use HasFactory;
	public function target()
	{
		return $this->belongsTo(View::class);
	}
}
