<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\App
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property string $code
 * @property string $name
 * @property string $icon
 * @property string $description
 * @property array $form
 * @property mixed $form_keys
 * @method static \Illuminate\Database\Eloquent\Builder|App newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|App newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|App query()
 * @method static \Illuminate\Database\Eloquent\Builder|App whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|App whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|App whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|App whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|App whereForm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|App whereFormKeys($value)
 * @method static \Illuminate\Database\Eloquent\Builder|App whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|App whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|App whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|App whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|App whereUpdatedBy($value)
 * @mixin \Eloquent
 */
class App extends Model
{
    protected $fillable = [
        'code',
        'name',
        'description',
        'icon',
        'form',
        'form_keys'
    ];
    protected $casts = [
        'form' => 'array',
        'form_keys' => 'array'
    ];
    public function className() : Attribute
    {
        return new Attribute(function () {
            return $this->snakeCaseToCamelCase($this->code);
        });
    }
    public function classFullName() : Attribute
    {
        return new Attribute(function () {
            return '\\App\\Models\\UserDefined\\' . $this->className();
        });
    }

    /**
     * e.g. from user_group to UserGroup
     */
    private function snakeCaseToCamelCase(string $target)
    {
        $words = explode('_', $target);
        foreach ($words as $key => $word) {
            $words[$key] = ucfirst($word);
        }
        return implode('', $words);
    }
    public function records()
    {
        $classFiler = new \App\Repository\App\UserDefinedModelClassRepository($this);
        $classFiler->require();
        return $this->hasMany($this->classFullName);
        // return $this->newEloquentBuilder(Db::table($this->code, $this->classFullName));
    }
    public static function findByCode(string $appCode) : App
    {
        $app = self::where("code", $appCode)->first();
        if (is_null($app)) {
            throw new \Exception("app not found with code ${appCode}");
        }
        return $app;
    }
}
