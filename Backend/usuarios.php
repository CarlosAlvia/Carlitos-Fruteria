<?php

function autenticar($data){
    if(!isset($data['cedula']) || !isset($data['clave'])){
        http_response_code(400);
        echo json_encode(['error' => 'Debe mandar los campos cédula y clave']);
        return;
    }
    $usuario = buscarUsuario($data['cedula'],md5($data['clave']));
    if(count($usuario) == 3){
        //Cookie válida por 10 horas y '/' se usa para que la cookie sea válida en toda la pág
        setcookie('user_info', json_encode($usuario), time() + 36000, '/');
        echo json_encode(['success' => true,'message' => 'Ingreso correcto']);
    }else{
        echo json_encode(['success' => false, 'message' => 'Identificación o clave incorrecta']);
        return;
    }
}

function buscarUsuario($cedula,$clave){
    $archivo = fopen("data/usuarios.txt", "r");
    $esta = false;
    $usuario = [];
    while(!feof($archivo) and !$esta) {
        $datos = explode(",",fgets($archivo));
        if ($datos[1] == $cedula) {
            $esta = true;
            if($datos[2] == $clave){
                $usuario = ["id"=>$datos[0], "nombre"=>$datos[3], "rol"=>$datos[4]];
            }
        }
    }
    fclose($archivo);
    return $usuario;
}

function registrarUsuario($data) {
    $archivo = "data/usuarios.txt";

    if(!isset($data['cedula']) || !isset($data['clave']) || !isset($data['nombre']) || !isset($data['telefono']) || !isset($data['direccion'])){
        http_response_code(400);
        echo json_encode(['error' => 'Debe mandar los campos cédula, clave, nombre, teléfono y dirección']);
        return;
    }

    $lineas = file($archivo);
    foreach ($lineas as $linea) {
        $datos = explode(",", trim($linea));
        if ($datos[1] == $data['cedula']) {
            http_response_code(409);
            echo json_encode(['success' => false, 'message' => 'El usuario ya existe']);
            return;
        }
    }

    $nuevoId = obtenerUltimoId($archivo) + 1;
    $clave_encriptada = md5($data['clave']);
    // El rol por defecto es 'usuario'
    $rol = 'usuario';
    
    $nuevoUsuario = "$nuevoId,{$data['cedula']},$clave_encriptada,{$data['nombre']},$rol,{$data['telefono']},{$data['direccion']}\n";
    file_put_contents($archivo, $nuevoUsuario, FILE_APPEND);
    
    echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
}