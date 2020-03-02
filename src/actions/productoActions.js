import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITOSO,
    PRODUCTO_ELIMINADO_ERROR
} from '../types/index';
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'


//Crear nuevo producto
export function crearNuevoProductoAction (producto){
    return async(dispatch) =>{
        dispatch(agregarProducto());
        try {
            //insertar en la API
            await clienteAxios.post('/productos',producto)
            
            //si todo sale bien actualizar el state
            dispatch(agregarProductoExito(producto));

            //Agregamos un alerta 
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            //si hay un error cambiar el state
            dispatch(agregarProductoError(true));
            
            //alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text:'Se produjo un error,intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
})

//almacena el producto con exito
const agregarProductoExito = producto => ({ //esto que esta entre parentesis es el action del reducer!!!!
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//Error al almacenar el producto
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//Funcion que descarga los productos de la base de datos 
export function obtenerProductosAction(){
    return async (dispatch) =>{
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            //console.log(respuesta.data)
            dispatch(descargaProductoExitosa(respuesta.data))
        } catch (error) {
            console.log(error);
            dispatch(descargaProductoError());
        }
    }
}

const descargarProductos= () => ({
    type:COMENZAR_DESCARGA_PRODUCTOS
})

const descargaProductoExitosa= (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductoError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//Selecciona y elimina un producto
export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        console.log(id)
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})