<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Group
 */
class Group extends Model
{
    use HasFactory;
	protected $fillable = [
		'code',
		'name',
		'description',
	];
	protected $hidden = [
		'id',
		'created_at',
		'updated_at',
	];
	public function users()
	{
		return $this->belongsToMany(User::class, 'user_group');
	}

}
