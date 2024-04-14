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
	protected $table = 'user_group';
	protected $timestamps = false;
	protected $fillable = ['user_id', 'group_id'];
}
