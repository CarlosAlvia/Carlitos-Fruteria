<?php
function obtenerUltimoId($archivo) {
    $ultimoId = 0;
    $lineas = file($archivo);
    if (!empty($lineas)) {
        $ultimaLinea = array_pop($lineas);
        $data = explode(',', trim($ultimaLinea));
        if (isset($data[0]) && is_numeric($data[0])) {
            $ultimoId = (int) $data[0];
        }
    }
    return $ultimoId;
}