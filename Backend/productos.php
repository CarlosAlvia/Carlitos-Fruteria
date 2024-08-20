<?php
include 'helperId.php';

function getProductos() {
    $productos = [];
    $file = fopen('data/productos.txt', 'r');
    if ($file) {
        fgets($file);
        while (($linea = fgets($file)) !== false) {
            $data = explode(',', trim($linea));
            if (count($data) === 4) {
                $productos[] = [
                    'id' => $data[0],
                    'nombre' => $data[1],
                    'precioKilo' => $data[2],
                    'urlimg' => $data[3]
                ];
            }
        }
        fclose($file);
    }
    echo json_encode($productos);
}

function crearProducto($data) {
    if (!isset($data['nombre']) || !isset($data['urlimg']) || !isset($data['precioKilo'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Los campos nombre, precioKilo y urlimg son obligatorios.']);
        return;
    }
    if (!is_numeric($data['precioKilo']) || (float)$data['precioKilo'] <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'El precioKilo debe ser un número flotante positivo.']);
        return;
    }
    $archivo = 'data/productos.txt';
    $ultimoId = obtenerUltimoId($archivo);
    $nuevoId = $ultimoId + 1;
    $nuevoProducto = "{$nuevoId},{$data['nombre']},{$data['precioKilo']},{$data['urlimg']}\n";
    file_put_contents($archivo, $nuevoProducto, FILE_APPEND);
    http_response_code(201);
    echo json_encode(['message' => 'Producto creado con éxito.']);
}
