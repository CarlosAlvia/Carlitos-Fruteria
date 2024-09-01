<?php
require_once 'helperId.php';

function crearPedido($pedidoData) {
    if (!isset($pedidoData['idUsuario']) || !isset($pedidoData['fecha']) || !isset($pedidoData['productos']) || !is_array($pedidoData['productos'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Los campos idUsuario, fecha y productos son obligatorios.']);
        return;
    }

    $archivoPedido = 'data/pedido.txt';
    $archivoDetalle = 'data/detallePedido.txt';
    $ultimoIdPedido = obtenerUltimoId($archivoPedido);
    $nuevoIdPedido = $ultimoIdPedido + 1;

    $total = array_sum(array_column($pedidoData['productos'], 'subtotal'));

    $nuevoPedido = "{$nuevoIdPedido},{$pedidoData['idUsuario']},{$pedidoData['fecha']},{$total}\n";
    file_put_contents($archivoPedido, $nuevoPedido, FILE_APPEND);

    foreach ($pedidoData['productos'] as $producto) {
        if (!isset($producto['idProducto']) || !isset($producto['cantidad']) || !isset($producto['subtotal'])) {
            continue;
        }
        $nuevoDetalle = "{$nuevoIdPedido},{$producto['idProducto']},{$producto['cantidad']},{$producto['subtotal']}\n";
        file_put_contents($archivoDetalle, $nuevoDetalle, FILE_APPEND);
    }

    http_response_code(201);
    echo json_encode(['message' => 'Pedido creado con éxito.']);
}