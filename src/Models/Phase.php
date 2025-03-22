<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    protected $table = 'phases';
    protected $fillable = ['phase_number', 'title', 'description', 'required_stars'];
    public $timestamps = false;

    // Relacionamento com progresso
    public function userProgress()
    {
        return $this->hasMany(UserProgress::class, 'phase_id');
    }
}