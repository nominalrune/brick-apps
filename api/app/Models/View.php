<?php

namespace App\Models;

use App\Repository\App\ViewRepository;
use Illuminate\Database\Eloquent\Casts\Attribute;
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
		'file',
		'name',
		'description',
		'list',
		'detail',
	];
	protected $appends = [
		'name',
		'description',
		'list',
		'detail',
	];
	protected string|null $name = null;
	protected string|null $description = null;
	protected array|null $list = null;
	protected array|null $detail = null;

	protected static function boot()
	{
		parent::boot();
		self::retrieved(function ($view) {
			$repository = new ViewRepository($view);
			$content = $repository->loadContent();
			$view->name = $content['name'];
			$view->description = $content['description'];
			$view->list = $content['list'];
			$view->detail = $content['detail'];
		});
		self::deleted(function ($view) {
			$repository = new ViewRepository($view);
			$repository->delete();
		});
	}
	public function save($options = [])
	{
		$repository = new ViewRepository($this);
		if (is_null($this->name) ||
			is_null($this->description) ||
			is_null($this->list) ||
			is_null($this->detail)) {
			throw new \Exception("name, description, list, detail are required");
		}
		$repository->upsert($this->name, $this->description, $this->list, $this->detail);
		unset($this->name);
		unset($this->description);
		unset($this->list);
		unset($this->detail);
		return parent::save($options);
	}

	public function name() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->name;
			},
			set: function ($value) {
				$this->name = $value;
			},
		);
	}

	public function description() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->description;
			},
			set: function ($value) {
				$this->description = $value;
			},
		);
	}

	public function list() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->list;
			},
			set: function ($value) {
				$this->list = $value;
			},
		);
	}

	public function detail() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->detail;
			},
			set: function ($value) {
				$this->detail = $value;
			},
		);
	}
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
