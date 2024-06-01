<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\View
 */
class View extends Model
{
	use HasFactory;
	protected $fillable = [
		'app_code',
		'code',
		'name',
		'description',
		'content'
	];
	protected $casts = [
		'content' => 'array',
	];
	public function app()
	{
		return $this->belongsTo(App::class);
	}
	public function permissions()
	{
		return $this->hasMany(ViewPermission::class);
	}
	public function users()
	{
		$relation = $this->hasMany(User::class);
		$query = $relation->getQuery()
			->distinct()
			->select('users.*')
			->join('user_group', 'users.id', '=', 'user_group.user_id')
			->join('groups', 'user_group.group_id', '=', 'groups.id')
			->join('view_permissions', 'groups.code', '=', 'view_permissions.group_code')
			->where('view_permissions.view_code', $this->code)
			->getQuery()
		;
		$relation->setQuery($query);
		return $relation;
	}
}
