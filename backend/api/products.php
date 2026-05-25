<?php
require_once __DIR__ . '/../config.php';

// Simple products endpoint
// GET /backend/api/products.php         -> returns list
// GET /backend/api/products.php?id=1    -> returns single product

// handle preflight
if($_SERVER['REQUEST_METHOD']==='OPTIONS'){
  http_response_code(204);
  exit;
}

$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$q = isset($_GET['q']) ? trim($_GET['q']) : null;
$cat = isset($_GET['cat']) ? trim($_GET['cat']) : null;

try{
  if($id){
    $stmt = $pdo->prepare('SELECT id,name,price,descr as `desc`,category as cat,img FROM products WHERE id = :id LIMIT 1');
    $stmt->execute(['id'=>$id]);
    $row = $stmt->fetch();
    if(!$row){ http_response_code(404); echo json_encode(['error'=>'Product not found']); exit; }
    echo json_encode($row);
    exit;
  }

  // build basic query
  $sql = 'SELECT id,name,price,descr as `desc`,category as cat,img FROM products';
  $params = [];
  $clauses = [];
  if($cat && $cat !== 'all'){ $clauses[] = 'category = :cat'; $params['cat']=$cat; }
  if($q){ $clauses[] = '(name LIKE :q OR descr LIKE :q)'; $params['q']='%'.$q.'%'; }
  if(count($clauses)) $sql .= ' WHERE ' . implode(' AND ', $clauses);
  $sql .= ' ORDER BY id ASC LIMIT 200';

  $stmt = $pdo->prepare($sql);
  $stmt->execute($params);
  $rows = $stmt->fetchAll();
  echo json_encode($rows);
}catch(Exception $e){
  http_response_code(500);
  echo json_encode(['error'=>'Query failed','message'=>$e->getMessage()]);
}

?>
