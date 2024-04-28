<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\ViewPermission
 */
class ViewPermission extends PermissionBase
{
	use HasFactory;
	public function view()
	{
		return $this->belongsTo(View::class, 'view_code', 'code');
	}
}
