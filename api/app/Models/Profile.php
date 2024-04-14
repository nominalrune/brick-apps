<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Profile
 *
 */
class Profile extends Model
{
	use SoftDeletes;
	static const DELETED_AT = 'archived_at';

	protected $fillable = [
		'name',
		'description',
		'avatar',
	];
}
