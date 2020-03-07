import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITOSO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITOSO,
    PRODUCTO_EDITADO_ERROR
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
        
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito())
            
            //si se elimina, mostrar alerta
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITOSO,
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true 
})

//Colocar producto en edicion
export function obtenerProductoEditar(producto) {
    return(dispatch)=>{
        dispatch(obtenerEditarProductoAction(producto));
    }
}

const obtenerEditarProductoAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//edita un registro en la api y el state
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto())
        try {
            const resultado = await clienteAxios.put(`/productos/${producto.id}`,producto)
            console.log(resultado)
            dispatch(editarProductoExito(producto))
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () => ({
    type:COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type:PRODUCTO_EDITADO_EXITOSO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload:true
})
