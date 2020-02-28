import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types/index';
import clienteAxios from '../config/axios'


//Crear nuevo producto
export function crearNuevoProductoAction (producto){
    return async(dispatch) =>{
        dispatch(agregarProducto());
        try {
            //insertar en la API
            await clienteAxios.post('/productos',producto)
            
            //si todo sale bien actualizar el state
            dispatch(agregarProductoExito(producto));
        } catch (error) {
            console.log(error)
            //si hay un error cambiar el state
            dispatch(agregarProductoError(true));
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