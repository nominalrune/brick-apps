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
	protected function boot()
	{
		parent::boot();
		$this->created(function () {
			$repository = new ViewRepository($this->toArray());
			$repository->create();
		}
		);
		$this->updated(function () {
			$repository = new ViewRepository($this->toArray());
			$repository->update();
		}
		);
		$this->deleted(function () {
			$repository = new ViewRepository($this->toArray());
			$repository->delete();
		});
	}
	protected array $_data;
	protected function data() : Attribute
	{
		return new Attribute(
			get: function () {
				if (is_null($this->_data)) {
					$this->loadJson($this->path);
				}
				return $this->_data;
			},
			set: function ($value) {
				$this->_data = $value;
			},
		);
	}
	protected function loadJson(string $path)
	{
		if (! file_exists($path)) {
			$this->data = [
				'name' => '',
				'description' => '',
				'list' => [],
				'detail' => [],
			];
			return;
		}
		$this->data = json_decode(file_get_contents($path), true);
	}

	public function name() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->data['name'];
			},
			set: function ($value) {
				$this->data['name'] = $value;
			},
		);
	}

	public function description() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->data['description'];
			},
			set: function ($value) {
				$this->data['description'] = $value;
			},
		);
	}

	public function list() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->data['list'];
			},
			set: function ($value) {
				$this->data['list'] = $value;
			},
		);
	}

	public function detail() : Attribute
	{
		return Attribute::make(
			get: function () {
				return $this->data['detail'];
			},
			set: function ($value) {
				$this->data['detail'] = $value;
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
