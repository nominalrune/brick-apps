<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AccessRule
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AccessRule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AccessRule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AccessRule query()
 * @method static \Illuminate\Database\Eloquent\Builder|AccessRule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccessRule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccessRule whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AccessRule extends Model
{
    use HasFactory;
}
