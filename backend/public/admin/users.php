<?php
require_once __DIR__.'/../../src/admin_auth.php';
require_admin();
require_once __DIR__.'/../../src/db.php';
$pdo = get_db();

if(isset($_GET['block'])){
    $id = intval($_GET['block']);
    $pdo->prepare('UPDATE users SET is_admin=0 WHERE id=?')->execute([$id]);
    header('Location: users.php'); exit;
}

$rows = $pdo->query('SELECT id,name,email,is_admin,created_at FROM users ORDER BY id DESC')->fetchAll();
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Admin - Users</title></head><body>
<h2>Users</h2>
<table border="1" cellpadding="6">
<tr><th>ID</th><th>Name</th><th>Email</th><th>Admin</th><th>Actions</th></tr>
<?php foreach($rows as $r): ?>
  <tr>
    <td><?=htmlspecialchars($r['id'])?></td>
    <td><?=htmlspecialchars($r['name'])?></td>
    <td><?=htmlspecialchars($r['email'])?></td>
    <td><?= $r['is_admin']? 'Yes':'No' ?></td>
    <td><?php if($r['is_admin']): ?> <a href="users.php?block=<?= $r['id'] ?>">Revoke admin</a><?php endif; ?></td>
  </tr>
<?php endforeach; ?>
</table>
<p><a href="index.php">Back to dashboard</a></p>
</body></html>
