<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Casts\App\Fields;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\App
 *
 */
class App extends Model
{
	use HasFactory, SoftDeletes;
	const DELETED_AT = 'archived_at';
	protected $fillable = [
		'code',
		'name',
		'description',
		'icon',
		'fields',
		'default_view',
	];
	protected $casts = [
		'fields' => "array",//Fields::class,
	];
	// public function records()
	// {
	// 	$query = $this->hasMany(Record::class);
	// 	$query->setQuery($query->getQuery()->from("app-{$this->code}")->getQuery());
	// 	return $query;
	// }

	public function defaultView()
	{
		return $this->hasOne('views', 'code', 'default_view');
	}
	public function views(User $user, int $permission = Permission::READ)
	{
		$relation = $this->hasMany(View::class);
		$query = $relation->getQuery()
			->distinct()
			->select('views.*')
			->join('view_permissions', 'views.id', '=', 'view_permissions.target_id')
			->join('groups', 'view_permissions.group_id', '=', 'groups.id')
			->join('user_group', 'groups.id', '=', 'user_group.group_id')
			->where('user_group.user_id', $user->id)
			->whereRaw("(view_permissions.permission & $permission) = $permission")
			->getQuery()
		;
		$relation->setQuery($query);
		return $relation;
	}
	public function references()
	{
		$relation = $this->hasMany(App::class);
		$query = $relation->getQuery()
			->distinct()
			->select('apps.*')
			->join('app_references', 'apps.code', '=', 'app_references.target_code')
			->where('app_references.parent_code', $this->code)
			->getQuery()
		;
		$relation->setQuery($query);
		return $relation;
	}
	public function permissions()
	{
		return $this->hasMany(AppPermission::class);
	}
	public function groups()
	{
		$relation = $this->hasMany(Group::class);
		$query = $relation->getQuery()
			->distinct()
			->select('groups.*')
			->join('app_permissions', 'groups.id', '=', 'app_permissions.group_id')
			->where('app_permissions.target_id', $this->id)
			->getQuery()
		;
		$relation->setQuery($query);
		return $relation;
	}

	public function users()
	{
		$relation = $this->hasMany(User::class);
		$query = $relation->getQuery()
			->distinct()
			->select('users.*')
			->join('user_group', 'users.id', '=', 'user_group.user_id')
			->join('groups', 'user_group.group_id', '=', 'groups.id')
			->join('app_permissions', 'groups.id', '=', 'app_permissions.group_id')
			->where('app_permissions.target_id', $this->id)
			->getQuery()
		;
		$relation->setQuery($query);
		return $relation;
	}




	public function className() : Attribute
	{
		return new Attribute(function () {
			return $this->snakeCaseToCamelCase($this->code);
		});
	}
	public function classFullName() : Attribute
	{
		return new Attribute(
			get: function () {
				return '\\App\\Models\\UserDefined\\' . $this->className;
			}
		);
	}
	public function records()
	{
		$classFiler = new \App\Repository\App\UserDefinedModelClassRepository($this);
		// the class will not be autoloaded so manually require it
		$classFiler->require();
		$hasMany = $this->hasMany($this->classFullName);
		$hasMany->setQuery(DB::query()->from($this->code));
		return $hasMany;
	}
	public static function findByCode(string $appCode) : App
	{
		$app = self::where("code", $appCode)->first();
		if (is_null($app)) {
			throw new \Exception("app not found with code {$appCode}");
		}
		return $app;
	}

	/**
	 * e.g. from user_group to UserGroup
	 */
	private function snakeCaseToCamelCase(string $target)
	{
		$words = explode('_', $target);
		foreach ($words as $key => $word) {
			$words[$key] = ucfirst($word);
		}
		return implode('', $words);
	}
}
