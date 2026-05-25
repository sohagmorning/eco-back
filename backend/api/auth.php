<?php
require_once __DIR__ . '/../config.php';
session_start();

if($_SERVER['REQUEST_METHOD']==='OPTIONS'){ http_response_code(204); exit; }

$body = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$action = isset($body['action']) ? $body['action'] : null;

try{
  if($action === 'signup'){
    $name = trim($body['name'] ?? '');
    $email = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';
    if(!$name || !$email || !$password){ http_response_code(400); echo json_encode(['error'=>'Missing fields']); exit; }
    // check existing
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
    $stmt->execute(['email'=>$email]); if($stmt->fetch()){ http_response_code(409); echo json_encode(['error'=>'Email already registered']); exit; }
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $ins = $pdo->prepare('INSERT INTO users (name,email,password) VALUES (:name,:email,:pass)');
    $ins->execute(['name'=>$name,'email'=>$email,'pass'=>$hash]);
    $uid = $pdo->lastInsertId();
    $_SESSION['user'] = ['id'=>$uid,'name'=>$name,'email'=>$email];
    echo json_encode(['success'=>true,'user'=>$_SESSION['user']]); exit;
  }

  if($action === 'login'){
    $email = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';
    if(!$email || !$password){ http_response_code(400); echo json_encode(['error'=>'Missing fields']); exit; }
    $stmt = $pdo->prepare('SELECT id,name,email,password FROM users WHERE email = :email LIMIT 1');
    $stmt->execute(['email'=>$email]); $u = $stmt->fetch();
    if(!$u || !password_verify($password, $u['password'])){ http_response_code(401); echo json_encode(['error'=>'Invalid credentials']); exit; }
    $_SESSION['user'] = ['id'=>$u['id'],'name'=>$u['name'],'email'=>$u['email']];
    echo json_encode(['success'=>true,'user'=>$_SESSION['user']]); exit;
  }

  if($action === 'logout'){
    session_unset(); session_destroy(); echo json_encode(['success'=>true]); exit;
  }

  // GET current user
  if($_SERVER['REQUEST_METHOD']==='GET'){
    if(!empty($_SESSION['user'])){ echo json_encode(['user'=>$_SESSION['user']]); }else{ echo json_encode(['user'=>null]); }
    exit;
  }

  http_response_code(400); echo json_encode(['error'=>'Unknown action']);
}catch(Exception $e){ http_response_code(500); echo json_encode(['error'=>'Server error','message'=>$e->getMessage()]); }

?>
