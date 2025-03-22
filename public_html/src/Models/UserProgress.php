<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    protected $table = 'user_progress';
    protected $fillable = ['user_id', 'phase_id', 'stars_earned', 'completed'];
    public $timestamps = false;

    // Relacionamentos
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function phase()
    {
        return $this->belongsTo(Phase::class, 'phase_id');
    }
}