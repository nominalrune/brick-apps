<?php
declare(strict_types=1);

namespace App\Models\UserDefined;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $fillable = [
        'name',
        'email'
    ];
    protected $table = "test";
    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }
}