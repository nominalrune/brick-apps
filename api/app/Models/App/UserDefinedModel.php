<?php

namespace App\Models\App;

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
class UserDefinedModel extends Model
{
	protected array $layout;
	protected function boot()
	{
		if(!empty($this->layout)) {
			$this->fillable = array_merge($this->fillable, $this->layout);
		}
	}
}