import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types/index';
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'


//Crear nuevo producto
export function crearNuevoProductoAction (producto){
    return async(dispatch) =>{
        dispatch(agregarProducto());
        try {
            //insertar en la API
            await clienteAxios.post('/produc',producto)
            
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