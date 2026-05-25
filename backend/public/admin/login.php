<?php
require_once __DIR__.'/../../src/db.php';
session_start();
if($_SERVER['REQUEST_METHOD']==='POST'){
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $pdo = get_db();
    $stmt = $pdo->prepare('SELECT id,password_hash,is_admin FROM users WHERE email=? LIMIT 1');
    $stmt->execute([$email]);
    $u = $stmt->fetch();
    if($u && password_verify($password, $u['password_hash']) && intval($u['is_admin'])===1){
        $_SESSION['user_id'] = $u['id'];
        header('Location: index.php'); exit;
    }else{
        $error = 'Invalid admin credentials';
    }
}
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Admin Login</title></head><body>
<h2>Admin Login</h2>
<?php if(!empty($error)) echo "<p style='color:red;'>".htmlspecialchars($error)."</p>"; ?>
<form method="post">
  <div><label>Email</label><input name="email" type="email" required></div>
  <div><label>Password</label><input name="password" type="password" required></div>
  <div><button type="submit">Login</button></div>
</form>
</body></html>
