<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PermissionBase
 */
class PermissionBase extends Model
{
	public $timestamps = false;
	protected $fillable = [
		'group_id',
		'target_id',
		'permission'
	];
	protected $hidden = [
		'id',
		'created_at',
		'updated_at',
	];
	public function groups()
	{
		return $this->belongsTo(Group::class, 'group_code', 'code');
	}

	/**
	 * Check if the permission is granted
	 */
	public function can(int $permission)
	{
		return ($this->permission & $permission) === $permission;
	}
}
