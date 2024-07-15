<?php

namespace App\Models;

use App\Repository\App\UserDefinedModelClassRepository;
use App\Services\Util\StringUtil;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Casts\App\Columns;
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
		'default_view',
	];
	protected $casts = [
	];
	protected $appends = [
		'description',
		'columns',
		'icon',
	];
	protected $hidden = [
		'created_at',
		'updated_at',
	];

	protected static function boot()
	{
		parent::boot();
		static::retrieved(function (App $app) {
			$app->requireClass();
		});
	}
	public function icon() : Attribute
	{
		return new Attribute(function () {
			return $this->recordClass::$icon;
		});
	}
	public function description() : Attribute
	{
		return new Attribute(function () {
			return $this->recordClass::$description;
		});
	}
	public function columns() : Attribute
	{
		return new Attribute(function () {
			return $this->recordClass::$columns;
		});
	}
	public View $_view;
	public function view() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->_view;
			},
			set: function ($view) {
				$this->_view = $view;
			}
		);
	}
	public function withView(?string $view_code)
	{
		if (! is_null($view_code)) {
			$this->view = View::where('code', $view_code)->first();
		} else {
			$this->view = $this->defaultView;
		}
		return $this->setAppends([...$this->appends, 'view']);
	}
	public function defaultView()
	{
		return $this->hasOne(View::class, 'code', 'default_view');
	}
	public function views()
	{
		$user = auth()->user();
		$relation = $this->hasMany(View::class);
		$query = $relation->getQuery()
			->distinct()
			->select('views.*')
			->join('view_permissions', 'views.id', '=', 'view_permissions.target_id')
			->join('groups', 'view_permissions.group_id', '=', 'groups.id')
			->join('user_group', 'groups.id', '=', 'user_group.group_id')
			->where('user_group.user_id', $user->id)
			// ->whereRaw("(view_permissions.permission & $permission) = $permission")
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

	public function recordClassName() : Attribute
	{
		return new Attribute(function () {
			return StringUtil::snakeToCamel($this->code ?? '');
		});
	}
	public function recordClass() : Attribute
	{
		return new Attribute(
			get: function () {
				return "\\App\\Models\\UserDefined\\$this->recordClassName\\$this->recordClassName";
			}
		);
	}
	public function recordQuery() : \Illuminate\Database\Query\Builder
	{
		return DB::query()->from($this->code);
	}
	protected function requireClass()
	{
		$classFiler = new UserDefinedModelClassRepository($this->code);
		// the class will not be autoloaded so manually require it
		$classFiler->require();
	}
	public function records()
	{
		info('records method', ['app' => $this]);
		// return new \Illuminate\Database\Eloquent\Relations\HasMany(
		// 	$this->recordClass->query(),
		// 	$this,
		// 	"{$this->code}.id",
		// 	'id'
		// );
		$hasMany = $this->hasMany($this->recordClass);
		$hasMany->setQuery(DB::query()->from($this->code));
		return $hasMany;
		// return DB::query()->from($this->code);
		// return $this->newHasMany(
		//     DB::query()->from($this->code), $this, $this->code.'.'.$foreignKey, $localKey
		// );
	}
	public static function findByCode(string $appCode) : App
	{
		$app = self::where("code", $appCode)->first();
		if (is_null($app)) {
			throw new \Exception("app not found with code {$appCode}");
		}
		return $app;
	}
}
