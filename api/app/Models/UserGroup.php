<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserGroup
 *
 * @mixin \Eloquent
 */
class UserGroup extends Model
{
	use HasFactory;
	protected $table = 'user_group';
	public $timestamps = false;
	protected $fillable = ['user_id', 'group_id'];
}
