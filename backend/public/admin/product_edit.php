<?php
require_once __DIR__.'/../../src/admin_auth.php';
require_admin();
require_once __DIR__.'/../../src/db.php';
$pdo = get_db();
$id = intval($_GET['id'] ?? 0);
$product = ['title'=>'','description'=>'','price'=>0,'category'=>'','status'=>1];
if($id){
    $stmt = $pdo->prepare('SELECT * FROM products WHERE id=? LIMIT 1'); $stmt->execute([$id]); $row = $stmt->fetch(); if($row) $product=$row;
}
if($_SERVER['REQUEST_METHOD']==='POST'){
    $title = $_POST['title']; $desc = $_POST['description']; $price = floatval($_POST['price']); $cat = $_POST['category']; $status = isset($_POST['status'])?1:0;
    if($id){
        $stmt = $pdo->prepare('UPDATE products SET title=?,description=?,price=?,category=?,status=? WHERE id=?');
        $stmt->execute([$title,$desc,$price,$cat,$status,$id]);
    }else{
        $stmt = $pdo->prepare('INSERT INTO products (title,description,price,category,status,created_at) VALUES (?,?,?,?,?,NOW())');
        $stmt->execute([$title,$desc,$price,$cat,$status]);
    }
    header('Location: products.php'); exit;
}
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Edit Product</title></head><body>
<h2><?= $id? 'Edit':'New' ?> Product</h2>
<form method="post">
  <div><label>Title</label><input name="title" value="<?=htmlspecialchars($product['title'])?>"></div>
  <div><label>Description</label><textarea name="description"><?=htmlspecialchars($product['description'])?></textarea></div>
  <div><label>Price</label><input name="price" value="<?=htmlspecialchars($product['price'])?>"></div>
  <div><label>Category</label><input name="category" value="<?=htmlspecialchars($product['category'])?>"></div>
  <div><label>Status</label><input type="checkbox" name="status" <?= $product['status']? 'checked':'' ?>></div>
  <div><button type="submit">Save</button></div>
</form>
<p><a href="products.php">Back</a></p>
</body></html>
