<?php
require_once __DIR__.'/../../src/admin_auth.php';
require_admin();
require_once __DIR__.'/../../src/db.php';
$pdo = get_db();
$rows = $pdo->query('SELECT o.id,o.total,o.status,o.payment_id,o.created_at,u.email FROM orders o LEFT JOIN users u ON u.id=o.user_id ORDER BY o.id DESC')->fetchAll();
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Admin - Orders</title></head><body>
<h2>Orders</h2>
<table border="1" cellpadding="6">
<tr><th>ID</th><th>User</th><th>Total</th><th>Status</th><th>Payment ID</th><th>Created</th></tr>
<?php foreach($rows as $r): ?>
  <tr>
    <td><?=htmlspecialchars($r['id'])?></td>
    <td><?=htmlspecialchars($r['email'])?></td>
    <td><?=htmlspecialchars($r['total'])?></td>
    <td><?=htmlspecialchars($r['status'])?></td>
    <td><?=htmlspecialchars($r['payment_id'])?></td>
    <td><?=htmlspecialchars($r['created_at'])?></td>
  </tr>
<?php endforeach; ?>
</table>
<p><a href="index.php">Back to dashboard</a></p>
</body></html>
