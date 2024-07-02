<?php
namespace App\Repository\App;

use App\Models\App;
use App\Models\View;
use Illuminate\Support\Facades\Log;

class UserDefinedModelClassRepository
{
	private string $dir;
	private string $path;
	private App $app;
	private string $className;
	public function __construct(App $app)
	{
		$this->app = $app;
		$this->dir = app_path("Models/UserDefined/{$app->code}");
		$this->className = $app->className;
		$this->path = $this->dir . '/' . $app->className . '.php';
		$this->className = $app->className;
		info("", ["dir" => $this->dir, "path" => $this->path, "className" => $this->className]);

		if (! file_exists($this->dir)) {
			mkdir($this->dir, 0777, true);
		}
	}
	public function create()
	{
		if ($this->exists()) {
			throw new \Exception("class file already exists:{$this->className}");
		}
		$content = $this->generateModel();
		$result = file_put_contents($this->path, $content);
		if ($result === false) {
			throw new \Exception("failed to create class file:{$this->path}");
		}
		return $this->path;
	}
	public function update()
	{
		$this->delete();
		$content = $this->generateModel();
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
	private function generateModel()
	{
		$fillables = implode(',' . PHP_EOL . '        ', array_map(fn ($column) => ("'{$column['code']}'"), $this->app->columns));
		$content = <<<EOL
<?php
declare(strict_types=1);

namespace App\Models\UserDefined;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class {$this->className} extends Model
{
    protected \$fillable = [
        $fillables
    ];
    protected \$table = "{$this->app->code}";
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
