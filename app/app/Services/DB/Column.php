<?php

namespace App\Services\DB;

use Illuminate\Database\Schema\Blueprint;

class Column
{
    public static function declareColumn(Blueprint $table, string $name, string $valueType, string $referringAppName='')
    {
        switch ($valueType) {
            case 'varchar':
                return $table->string($name, 255);
            case 'text':
                return $table->text($name);
            case 'integer':
                return $table->integer($name);
            case 'float':
                return $table->float($name);
            case 'boolean':
                return $table->boolean($name);
            case 'date':
                return $table->date($name);
            case 'datetime':
                return $table->datetime($name);
            case 'reference':
                return $table->foreignId($name)->nullable()->constrained($referringAppName)->onUpdate('restrict')->onDelete('set null');
            default:
                throw new \Exception('invalid value type');
        }
    }

    public static function changeColumn(Blueprint $table, string $name, string $valueType, string $referringAppName='')
    {
        return self::declareColumn($table, $name, $valueType, $referringAppName)->change();
    }
}
