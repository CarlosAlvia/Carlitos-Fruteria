<?php
include 'productos.php';
include 'pedido.php';
include 'usuarios.php';

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Vary: Origin');
header('Content-Type: application/json, charset=utf-8');
header("Access-Control-Allow-Credentials: true");
if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); 
if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

// $uri = $_SERVER['REQUEST_URI'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if($method == "OPTIONS"){
    exit(0);
}
if($uri === '/login' && $method === 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);
    autenticar($data);
}elseif ($uri === '/productos' && $method === 'GET') {
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

