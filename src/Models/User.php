<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $fillable = ['name', 'email', 'password'];
    public $timestamps = true;

    public function progress()
    {
        return $this->hasMany(UserProgress::class, 'user_id');
    }
}