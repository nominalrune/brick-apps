<?php

namespace Domain\Common\Value;

class Id{
	private int $id;

	public function __construct(int $id){
		$this->verifyId($id);
		$this->id = $id;
	}
	private function verifyId(int $id): void{
		if($id < 1){
			throw new \InvalidArgumentException('Id must be greater than 0');
		}
	}

	public function get(): int{
		return $this->id;
	}
}
