<?php

namespace App\Casts\App;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use App\Models\App\Field;

class Fields implements CastsAttributes
{
	/** @var array<Field> */
	private array $value;
    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return $this->value;
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
		if(is_array($value)){
			throw new \InvalidArgumentException("\$value must be an array of ['code'=>string,'valueType'=>string]. {${var_dump($value)}} given");
		}
		$this->value = array_map(fn($item)=>(Field::fromDTO($value)), $value);
        return $this->value;
    }
}

