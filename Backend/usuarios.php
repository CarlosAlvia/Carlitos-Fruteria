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