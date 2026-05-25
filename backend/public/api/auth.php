<?php
require_once __DIR__ . '/../../src/db.php';
header('Content-Type: application/json');
session_start();

$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true) ?? $_POST;

if($action==='signup'){
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    if(!$name || !$email || !$password){ http_response_code(400); echo json_encode(['error'=>'Missing fields']); exit; }
    $pdo = get_db();
    $hash = password_hash($password, PASSWORD_DEFAULT);
    try{
        $stmt = $pdo->prepare('INSERT INTO users (name,email,password_hash,created_at) VALUES (?,?,?,NOW())');
        $stmt->execute([$name,$email,$hash]);
        echo json_encode(['ok'=>true]);
    }catch(PDOException $e){ http_response_code(500); echo json_encode(['error'=>$e->getMessage()]); }
    exit;
}

if($action==='login'){
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    if(!$email || !$password){ http_response_code(400); echo json_encode(['error'=>'Missing fields']); exit; }
    $pdo = get_db();
    $stmt = $pdo->prepare('SELECT id,name,email,password_hash,is_admin FROM users WHERE email=? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if($user && password_verify($password, $user['password_hash'])){
        $_SESSION['user_id'] = $user['id'];
        echo json_encode(['ok'=>true,'user'=>['id'=>$user['id'],'name'=>$user['name'],'email'=>$user['email'],'is_admin'=>intval($user['is_admin'])]]);
    }else{
        http_response_code(401); echo json_encode(['error'=>'Invalid credentials']);
    }
    exit;
}

echo json_encode(['error'=>'No action']);
