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
	public function app()
	{
		return $this->belongsTo(App::class);
	}
	public function permissions()
	{
		return $this->hasMany(ViewPermission::class);
	}
}
