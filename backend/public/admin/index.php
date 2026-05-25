<?php
require_once __DIR__.'/../../src/admin_auth.php';
require_admin();
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Admin Dashboard</title></head><body>
<h1>Admin Dashboard</h1>
<ul>
  <li><a href="products.php">Products</a></li>
  <li><a href="users.php">Users</a></li>
  <li><a href="orders.php">Orders</a></li>
  <li><a href="../api/auth.php?action=logout">Logout (not implemented)</a></li>
</ul>
</body></html>
