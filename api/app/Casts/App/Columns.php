<?php

namespace App\Casts\App;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use App\Models\App\Column;

class Columns implements CastsAttributes
{
	/** @var array<Column> */
	private array $value;
	/**
	 * Cast the given value.
	 *
	 * @param  array<string, mixed>  $attributes
	 */
	public function get(Model $model, string $key, mixed $value, array $attributes) : mixed
	{
		return $this->value;
	}

	/**
	 * Prepare the given value for storage.
	 *
	 * @param  array<string, mixed>  $attributes
	 */
	public function set(Model $model, string $key, mixed $value, array $attributes) : mixed
	{
		$_value = json_decode($value, JSON_OBJECT_AS_ARRAY);
		if (!is_array($_value)) {
			throw new \InvalidArgumentException("value must be an array of ['code'=>string,'valueType'=>string]. " . print_r($_value, true) . " given");
		}
		$this->value = array_map(fn ($item) => (Column::fromDTO($item)), $_value);
		return $this->value;
	}
}

