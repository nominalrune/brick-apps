<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Record
 *
 * @property-read \App\Models\User|null $createdBy
 * @property-read \App\Models\User|null $updatedBy
 * @method static \Illuminate\Database\Eloquent\Builder|Record newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Record newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Record query()
 * @mixin \Eloquent
 */
class Record extends Model
{
    // static function boot()
    // {
    //     parent::boot();
    //     parent::setTable("record");
    //     static::creating(function ($model) {
    //         $model->created_by = auth()->user()->id;
    //         $model->updated_by = auth()->user()->id;
    //     });
    //     static::updating(function ($model) {
    //         $model->updated_by = auth()->user()->id;
    //     });
    // }
    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }

}
