<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\Profile
 *
 */
class Profile extends Model
{
	use HasFactory,SoftDeletes;
	const DELETED_AT = 'archived_at';

	protected $fillable = [
		'name',
		'description',
		'avatar',
	];
	protected $hidden = [
		'id',
		'created_at',
		'updated_at',
	];
}
