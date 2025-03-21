<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $fillable = ['name', 'email', 'password', 'avatar'];
    public $timestamps = true;

    // Relacionamento com progresso
    public function progress()
    {
        return $this->hasMany(UserProgress::class, 'user_id');
    }
}