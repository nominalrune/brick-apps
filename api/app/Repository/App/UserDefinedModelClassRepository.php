<?php
namespace Repository\App;

use App\Models\App;

class UserDefinedModelClassRepository
{
    private $dir = storage_path('app/Models/UserDefined');
    private $path = $this->dir . '/' . $app->className . '.php';
    private App $app;
    private string $className = $app->className;
    public function __construct(App $app)
    {
        $this->app = $app;
    }
    public function create()
    {
        if ($this->exists()) {
            throw new \Exception("class file already exists:{$this->className}");
        }
        $content = $this->generateContent();
        $result = file_put_contents($this->path, $content);
        if ($result === false) {
            throw new \Exception("failed to create class file:{$this->path}");
        }
        return $this->path;
    }
    public function update()
    {
        if (! $this->exists()) {
            throw new \Exception("class file not found:{$this->className}");
        }
        $content = $this->generateContent();
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
        return in_array($this->path, $list);
    }
    private function generateContent()
    {
        $fillables = implode(',\n        ', $this->app->form_keys);
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
