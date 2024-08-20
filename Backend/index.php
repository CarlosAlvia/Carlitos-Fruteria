<?php
include 'productos.php';
include 'pedido.php';

header('Content-Type: application/json');

// $uri = $_SERVER['REQUEST_URI'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/productos' && $method === 'GET') {
  //Si no se establece estado de código, por defecto es 200
  getProductos();
}elseif ($uri === '/crear-producto' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    crearProducto($data);
}elseif ($uri === '/productos-especificos' && $method === 'GET') {
    getProductosEspecificos();
}elseif ($uri === '/crear-pedido' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    crearPedido($data);
}elseif ($uri === '/' && $method === 'GET') {
    echo "Hello World";
}else {
    http_response_code(404);
    echo json_encode(['message' => 'Not Found']);
    exit();
}

