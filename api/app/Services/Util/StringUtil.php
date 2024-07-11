<?php

namespace App\Services\Util;

class StringUtil
{
	public static function snakeToCamel(string $snake): string
	{
		return str_replace('_', '', ucwords($snake, '_'));
	}

	public static function camelToSnake(string $camel): string
	{
		return strtolower(preg_replace('/[A-Z]/', '_$0', $camel));
	}
}