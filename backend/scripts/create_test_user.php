<?php
// Usage: php create_test_user.php [name] [email] [password] [role]
require_once __DIR__ . '/../config.php';

$name = $argv[1] ?? 'Test User';
$email = $argv[2] ?? 'test@example.com';
$password = $argv[3] ?? 'secret';
$role = $argv[4] ?? 'admin';

try{
  // check existing
  $stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
  $stmt->execute(['email'=>$email]);
  if($stmt->fetch()){
    echo "User with email {$email} already exists.\n";
    exit(0);
  }

  $hash = password_hash($password, PASSWORD_DEFAULT);
  $ins = $pdo->prepare('INSERT INTO users (name,email,password,role) VALUES (:name,:email,:pass,:role)');
  $ins->execute(['name'=>$name,'email'=>$email,'pass'=>$hash,'role'=>$role]);
  $id = $pdo->lastInsertId();
  echo "Created user id={$id}, email={$email}, password={$password}\n";
}catch(Exception $e){
  echo "Error: " . $e->getMessage() . "\n";
  exit(1);
}

?>
