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
		'created_by',
		'updated_by',
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
	protected $hidden = [
		'created_at',
		'updated_at',
	];
	protected string|null $name = null;
	protected string|null $_description = null;
	protected array|null $_list = null;
	protected array|null $_detail = null;

	protected static function boot()
	{
		parent::boot();
		self::retrieved(function (View $view) {
			$repository = new ViewRepository($view);
			$content = $repository->loadContent();

			$view->_description = $content['description'];
			$view->_list = $content['list'];
			$view->_detail = $content['detail'];
			if ($view->name !== $content['name']) {
				$view->name = $content['name'];
				$view->save();
			}
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
			is_null($this->_description) ||
			is_null($this->_list) ||
			is_null($this->_detail)) {
			throw new \Exception("name, description, list, detail are required");
		}
		$repository->upsert($this->name, $this->_description, $this->_list, $this->_detail);
		// unset($this->name);
		unset($this->description);
		unset($this->list);
		unset($this->detail);
		// dd($this);
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
				return $value;
			},
		);
	}

	public function description() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->_description;
			},
			set: function ($value) {
				$this->_description = $value;
			},
		);
	}

	public function list() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->_list;
			},
			set: function ($value) {
				$this->_list = $value;
			},
		);
	}

	public function detail() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->_detail;
			},
			set: function ($value) {
				$this->_detail = $value;
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
