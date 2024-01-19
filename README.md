# ServerSurf
<img src="./image/env.png" width='400px'/><br>
modelo E-R<br><br>
<img src="./image/e-r.jpeg" width='800px'/><br>



PASOS PARA UNA VENTA<br>
PRIMERO AGREGAR AL CARRITO<br>
{   
    "idUser":"1",
    "idProduct":"7",
    "amount": "2",
}

CREAR LA VENTA<br>
{   
    "idUser":"1",
    "costSale":"662.6"
}

AÑADIR AL DETALLE<br>
{   
    "idSale":"7", 
    "idUser":"1", 
    "listProducts": [1,2,5,7]
}


ELIMINAR EL CARRITO<br>
