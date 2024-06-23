<?php
namespace App\Repository\App;

use App\Models\App;
use App\Models\View;
use Illuminate\Support\Facades\Log;

class UserDefinedViewRepository
{
	private string $dir;
	private string $path;
	private View $view;
	private string $className;
	public function __construct(View $view)
	{
		$this->view = $view;
		$this->dir = app_path("Models/UserDefined/{$view->app->className}/views");
		$this->className = $view->code;
		$this->path = $this->dir . '/' . $view->code . '.json';

		if (! file_exists($this->dir)) {
			mkdir($this->dir, 0777, true);
		}
	}
	public function create()
	{
		if ($this->exists()) {
			throw new \Exception("class file already exists: {$this->className}");
		}
		$content = $this->generateJson();
		$result = file_put_contents($this->path, $content);
		if ($result === false) {
			throw new \Exception("failed to create class file: {$this->path}");
		}
		return $this->path;
	}
	public function update()
	{
		$this->delete();
		$content = $this->generateJson();
		$result = file_put_contents($this->path, $content);
		if ($result === false) {
			throw new \Exception("failed to update class file:{$this->path}");
		}
		return $this->path;
	}
	public function delete()
	{
		if (! $this->exists()) {
			throw new \Exception("class file not found:{$this->className}");
		}
		$result = unlink($this->path);
		if ($result === false) {
			throw new \Exception("failed to delete class file:{$this->path}");
		}
		return $this->path;
	}
	public function require()
	{
		if (! $this->exists()) {
			throw new \Exception("class file not found:{$this->className}");
		}
		require_once $this->path;
	}
	private function listFiles() : array
	{
		$list = scandir($this->dir);
		if ($list === false) {
			throw new \Exception("failed to scan dir:{$this->dir}");
		}
		return $list;
	}
	private function exists() : bool
	{
		$list = $this->listFiles();
		Log::info("", ["files" => $list]);
		return in_array($this->className . ".json", $list);
	}
	private function generateJson()
	{
		$content = json_encode($this->view->toArray());
		return $content;
	}
}
