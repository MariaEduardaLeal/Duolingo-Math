<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users'; // Nome da tabela no banco de dados
    protected $fillable = ['name','email', 'password']; // Campos que podem ser preenchidos
    public $timestamps = true; // Habilita created_at e updated_at

    // Relacionamento com progresso
    public function progress()
    {
        return $this->hasMany(UserProgress::class, 'user_id');
    }
}