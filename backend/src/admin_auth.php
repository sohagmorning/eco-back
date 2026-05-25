<?php
// Simple admin auth middleware
if(session_status()===PHP_SESSION_NONE) session_start();
require_once __DIR__.'/db.php';

function require_admin(){
    if(empty($_SESSION['user_id'])){
        header('Location: /admin/login.php'); exit;
    }
    $pdo = get_db();
    $stmt = $pdo->prepare('SELECT id,is_admin FROM users WHERE id=? LIMIT 1');
    $stmt->execute([$_SESSION['user_id']]);
    $u = $stmt->fetch();
    if(!$u || intval($u['is_admin'])!==1){
        echo "<h3>Access denied</h3>"; exit;
    }
    return $u;
}
