<?php

namespace App\Models\App;

class Column
{
	public function __construct(
		public string $code,
		public string $valueType,
	) {
	}
	public function withValueType(string $value)
	{
		return new self($this->code, $value);
	}
	function toDTO()
	{
		return [
			"code" => $this->code,
			"valueType" => $this->valueType,
		];
	}
	static function fromDTO(array $value){
		return new Column(
			$value['code'],
			$value['valueType'],
		);
	}
}