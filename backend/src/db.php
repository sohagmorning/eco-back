<?php
require_once __DIR__.'/config.php';

function get_db(){
    static $pdo = null;
    if($pdo) return $pdo;
    try{
        $pdo = new PDO(DB_DSN, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        return $pdo;
    }catch(PDOException $e){
        if(defined('APP_DEBUG') && APP_DEBUG){
            header('Content-Type: application/json');
            echo json_encode(['error'=>'DB connection failed: '.$e->getMessage()]);
            exit;
        }
        return null;
    }
}
