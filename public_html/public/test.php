<?php
require_once '../src/config.php';
use Illuminate\Database\Capsule\Manager as DB;

$users = DB::table('users')->get();
echo "Usuários encontrados: " . $users->count();