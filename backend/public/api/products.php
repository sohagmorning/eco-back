<?php
require_once __DIR__ . '/../../src/db.php';
header('Content-Type: application/json');

$pdo = get_db();
if($pdo){
    try{
        $stmt = $pdo->query('SELECT id,title,description,price,category FROM products WHERE status=1 LIMIT 100');
        $rows = $stmt->fetchAll();
        echo json_encode(['products'=>$rows]);
        exit;
    }catch(Exception $e){
        // fallback to sample
    }
}

// fallback sample
$sample = [
    ['id'=>1,'title'=>'Ebook: Sustainable Living','description'=>'Guide to eco living','price'=>350,'category'=>'ebooks'],
    ['id'=>2,'title'=>'Website Template: Green Shop','description'=>'HTML/CSS template','price'=>799,'category'=>'templates']
];
echo json_encode(['products'=>$sample]);
