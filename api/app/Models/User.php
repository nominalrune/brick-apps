<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * App\Models\User
 *
 */
class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable, SoftDeletes;
	static const DELETED_AT = 'archived_at';
	protected $fillable = [
		'email',
		'password',
	];
	protected $hidden = [
		'password',
		'remember_token',
	];
	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
	];

	public function profile()
	{
		return $this->hasOne(Profile::class);
	}

	public function groups()
	{
		return $this->belongsToMany(Group::class, 'user_group');
	}

	public function appPermissions()
	{
		$relation = $this->hasMany(AppPermission::class);
		$query = $relation->getQuery()
			->distinct()
			->select('permissions.*')
			->join('groups', 'permissions.group_id', '=', 'groups.group_id')
			->join('user_group', 'groups.group_id', '=', 'user_group.group_id')
			->where('user_group.user_id', $this->id)
			->getQuery()
		;
		$relation->setQuery($query);
		return $relation;
	}

	public function apps(int $permission = Permission::READ)
	{
		$relation = $this->hasMany(App::class);
		$query = $relation->getQuery()
			->distinct()
			->select('apps.*')
			->join('app_permissions', 'apps.id', '=', 'app_permissions.target_id')
			->join('groups', 'app_permissions.group_id', '=', 'groups.id')
			->join('user_group', 'groups.id', '=', 'user_group.group_id')
			->where('user_group.user_id', $this->id)
			->whereRaw("(app_permissions.permission & {$permission}) = {$permission}")
			->getQuery()
		;
		$relation->setQuery($query);
		return $relation;
	}
	// public function apps() : Attribute
	// {
	// 	return new Attribute(
	// 		get: fn () => App::distinct()
	// 			->select('apps.*')
	// 			->join('permissions', 'apps.id', '=', 'permissions.target_id')
	// 			->join('groups', 'permissions.group_id', '=', 'groups.id')
	// 			->join('user_group', 'groups.id', '=', 'user_group.group_id')
	// 			->where('user_group.user_id', $this->id)
	// 			->whereRaw("(permissions.permission & {${Permission::READ} }) = {${Permission::READ} }")
	// 	);
	// }
}
