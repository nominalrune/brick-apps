<?php
namespace App\Repository\App;

use App\Models\App;
use App\Models\View;
use Illuminate\Support\Facades\Log;

class ViewRepository
{
	private string $dir;
	private string $file;
	private string $code;
	public function __construct(View $view)
	{
		$this->dir = dirname($view->file);
		$this->code = $view->code;
		$this->file = $view->file;

		if (! file_exists($this->dir)) {
			mkdir($this->dir, 0777, true);
		}
	}
	public function create(string $name, string $description, array $list, array $detail)
	{
		if ($this->exists()) {
			throw new \Exception("view json file already exists: {$this->file}");
		}
		$content = $this->generateJson($name, $description, $list, $detail);
		$result = file_put_contents($this->file, $content);
		if ($result === false) {
			throw new \Exception("failed to create class file: {$this->file}");
		}
		return $this->file;
	}
	public function upsert(string $name, string $description, array $list, array $detail)
	{
		$content = $this->generateJson($name, $description, $list, $detail);
		$result = file_put_contents($this->file, $content);
		if ($result === false) {
			throw new \Exception("failed to update class file:{$this->file}");
		}
		return $this->file;
	}
	public function updateName(string $name)
	{
		$original = $this->loadContent();
		$content = $this->generateJson(
			$name,
			$original['description'],
			$original['list'],
			$original['detail']
		);
		return $this->save($content);
	}
	public function updateDescription(string $description)
	{
		$original = $this->loadContent();
		$content = $this->generateJson(
			$original['name'],
			$description,
			$original['list'],
			$original['detail']
		);
		return $this->save($content);
	}
	public function updateList(array $list)
	{
		$original = $this->loadContent();
		$content = $this->generateJson(
			$original['name'],
			$original['description'],
			$list,
			$original['detail']
		);
		return $this->save($content);
	}
	public function updateDetail(array $detail)
	{
		$original = $this->loadContent();
		$content = $this->generateJson(
			$original['name'],
			$original['description'],
			$original['list'],
			$detail
		);
		return $this->save($content);
	}
	public function delete()
	{
		if (! $this->exists()) {
			throw new \Exception("class file not found:{$this->code}");
		}
		$result = unlink($this->file);
		if ($result === false) {
			throw new \Exception("failed to delete class file:{$this->file}");
		}
		return $this->file;
	}
	private function save(string $content)
	{
		$result = file_put_contents($this->file, $content);
		if ($result === false) {
			throw new \Exception("failed to update class file:{$this->file}");
		}
		return $this->file;
	}
	public function loadContent()
	{
		$json = file_get_contents($this->file);
		$content = json_decode($json, true);
		return $content;
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
		return file_exists($this->file);
	}
	private function generateJson(string $name, string $description, array $list, array $detail)
	{
		$content = json_encode([
			'name' => $name,
			'description' => $description,
			'list' => $list,
			'detail' => $detail,
		]);
		return $content;
	}
}
