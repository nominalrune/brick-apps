<?php

namespace Domain\App;

use App\Models\App as AppModel;
use Domain\Common\Value\Id;
use Domain\App\Value\Code;

class App{
	private AppModel $model;
	public Id $id;
	public Code $code;
	public string $name;
	public string $description;
	public string $icon;
	public array $fields;

	public function __construct(AppModel $app){
		$this->model = $app;
	}

}
