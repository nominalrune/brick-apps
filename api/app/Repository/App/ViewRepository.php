<?php
namespace App\Repository\App;

use App\Models\App;
use App\Models\View;
use Illuminate\Support\Facades\Log;

class ViewRepository
{
	private string $dir;
	private string $path;
	private array $view;
	private string $code;
	public function __construct(array $view)
	{
		$this->view = $view;
		$this->dir = $view['file'];
		$this->code = $view['code'];
		$this->path = $view['file'];

		if (! file_exists($this->dir)) {
			mkdir($this->dir, 0777, true);
		}
	}
	public function create()
	{
		if ($this->exists()) {
			throw new \Exception("view json file already exists: {$this->path}");
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
			throw new \Exception("class file not found:{$this->code}");
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
			throw new \Exception("class file not found:{$this->code}");
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
		return file_exists($this->path);
	}
	private function generateJson()
	{
		$content = json_encode([
			'name' => $this->view['name'],
			'description' => $this->view['description'],
			'list' => $this->view['list'],
			'detail' => $this->view['detail'],
		]);
		return $content;
	}
}
