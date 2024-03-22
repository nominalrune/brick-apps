<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AccessGroup
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AccessGroup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AccessGroup newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AccessGroup query()
 * @method static \Illuminate\Database\Eloquent\Builder|AccessGroup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccessGroup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccessGroup whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AccessGroup extends Model
{
    use HasFactory;
}
