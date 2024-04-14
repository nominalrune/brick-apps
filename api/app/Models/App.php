<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Casts\App\Fields;
/**
 * App\Models\App
 *
 */
class App extends Model
{
	protected $fillable = [
		'code',
		'name',
		'description',
		'icon',
		'fields',
	];
	protected $casts = [
		'fields' => Fields::class,
	];
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
		return new Attribute(function () {
			return '\\App\\Models\\UserDefined\\' . $this->className();
		});
	}
	public function records()
	{
		$classFiler = new \Repository\App\UserDefinedModelClassRepository($this);
		$classFiler->require();
		return $this->hasMany($this->classFullName);
		// return $this->newEloquentBuilder(Db::table($this->code, $this->classFullName));
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
