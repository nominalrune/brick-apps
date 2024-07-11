<?php

namespace Domain\App\Value;

class Code{
	private string $code;

	public function __construct(string $code){
		$this->verifyCode($code);
		$this->code = $code;
	}
	private function verifyCode(string $code): void{
		if(strlen($code) < 2){
			throw new \InvalidArgumentException('Code must be at least 2 character long');
		}
		// must be /[a-z][0-9a-z_]+/
		if(!preg_match('/^[a-z][0-9a-z_]+$/', $code)){
			throw new \InvalidArgumentException('Code must be /[a-z][0-9a-z_]+/');
		}
	}
	public function get(): string{
		return $this->code;
	}
}
