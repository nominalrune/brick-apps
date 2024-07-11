<?php
namespace App\Repository\App;

use App\Models\App;
use App\Models\View;
use App\Services\Util\StringUtil;
use Illuminate\Support\Facades\Log;

class UserDefinedModelClassRepository
{
	private string $dir;
	private string $path;
	private string $code;
	private string $className;
	public function __construct(string $code)
	{
		$className = StringUtil::snakeToCamel($code);
		$this->className = $className;
		$this->dir = app_path("Models/UserDefined/{$className}");
		$this->code = $code;
		$this->path = $this->dir . '/' . $className . '.php';

		if (! file_exists($this->dir)) {
			mkdir($this->dir, 0777, true);
		}
	}
	public function create(
		string $name,
		string $description,
		string $icon,
		array $columns
		)
	{
		if ($this->exists()) {
			throw new \Exception("class file already exists:{$this->className}");
		}
		$content = $this->generateModel($name, $description, $icon, $columns);
		$result = file_put_contents($this->path, $content);
		if ($result === false) {
			throw new \Exception("failed to create class file:{$this->path}");
		}
		return $this->path;
	}
	public function update(
		string $name,
		string $description,
		string $icon,
		array $columns
		)
	{
		$this->delete();

		$content = $this->generateModel($name, $description, $icon, $columns);
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
		return in_array($this->className . ".php", $list);
	}
	private function generateModel(
		string $name,
		string $description,
		string $icon,
		array $columns)
	{
		$fillables = implode(',' . PHP_EOL . '		', array_map(fn ($column) => ("'{$column['code']}'"), $columns));
		$columns = implode(
			',',
			array_map(
				fn (array $col) => (
					'['. PHP_EOL . '			' . implode(
						',' . PHP_EOL . '			',
						array_map(fn (string $value, string $key) => "\"{$key}\" => \"{$value}\"", $col, array_keys($col))
					) . ',' . PHP_EOL . '		]'
				),
				$columns
			)
		);
		$content = <<<EOL
<?php
declare(strict_types=1);

namespace App\Models\UserDefined\\{$this->className};

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class {$this->className} extends Model
{
	protected \$fillable = [
		$fillables
	];
	public \$table = "{$this->code}";
	public static \$code = "{$this->code}";
	public static \$name = "{$name}";
	public static \$description = "{$description}";
	public static \$icon = "{$icon}";
	public static \$columns = [
		{$columns}
	];

	public function createdBy()
	{
		return \$this->belongsTo(User::class);
	}
	public function updatedBy()
	{
		return \$this->belongsTo(User::class);
	}
}
EOL;
		return $content;
	}
}
