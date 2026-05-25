<?php
require_once __DIR__.'/../../src/admin_auth.php';
require_admin();
require_once __DIR__.'/../../src/db.php';
$pdo = get_db();

// handle delete
if(isset($_GET['delete'])){
    $id = intval($_GET['delete']);
    $stmt = $pdo->prepare('DELETE FROM products WHERE id=?'); $stmt->execute([$id]);
    header('Location: products.php'); exit;
}

$rows = $pdo->query('SELECT id,title,price,category,status,created_at FROM products ORDER BY id DESC')->fetchAll();
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Admin - Products</title></head><body>
<h2>Products <a href="product_edit.php">+ New</a></h2>
<table border="1" cellpadding="6">
<tr><th>ID</th><th>Title</th><th>Price</th><th>Category</th><th>Status</th><th>Actions</th></tr>
<?php foreach($rows as $r): ?>
  <tr>
    <td><?=htmlspecialchars($r['id'])?></td>
    <td><?=htmlspecialchars($r['title'])?></td>
    <td><?=htmlspecialchars($r['price'])?></td>
    <td><?=htmlspecialchars($r['category'])?></td>
    <td><?= $r['status']? 'Active':'Inactive' ?></td>
    <td><a href="product_edit.php?id=<?= $r['id'] ?>">Edit</a> | <a href="products.php?delete=<?= $r['id'] ?>" onclick="return confirm('Delete?')">Delete</a></td>
  </tr>
<?php endforeach; ?>
</table>
<p><a href="index.php">Back to dashboard</a></p>
</body></html>
