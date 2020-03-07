import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types'

//Muestra una alerta 
export function mostrarAlerta(alerta){
    return(dispatch) => {
        dispatch(crearAlerta(alerta))
    }
}

const crearAlerta= alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

//Ocultar un alerta 
export function ocultarAlerta(){
    return(dispatch) => {
        dispatch(ocultarAlertaError())
    }
}

const ocultarAlertaError = () => ({
    type: OCULTAR_ALERTA
})