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
			->join('view_permissions', 'groups.id', '=', 'view_permissions.group_id')
			->where('view_permissions.target_id', $this->id)
			->getQuery()
		;
		$relation->setQuery($query);
		return $relation;
	}
}
