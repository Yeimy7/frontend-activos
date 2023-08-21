import {
  AGREGAR_PISO,
  BAJA_PISO,
  OBTENER_PISOS,
  PISO_ERROR,
  PISO_ACTUAL,
  LIMPIAR_PISO,
  ACTUALIZAR_PISO,
  FORMULARIO_PISO,
  AMBIENTES_PISO,
  LIMPIAR_AMBIENTES_PISO,
  RESET_MESSAGE,
} from '../../types';
export const pisoReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_PISOS:
      return {
        ...state,
        pisos: action.payload,
      };
    case AGREGAR_PISO:
      const alerta = {
        msg: 'Piso creado exitosamente',
        type: 'success',
      };
      return {
        ...state,
        pisos: [action.payload, ...state.pisos],
        mensaje_piso: alerta,
        formulario: false,
      };
    case ACTUALIZAR_PISO:
      return {
        ...state,
        pisos: state.pisos.map((piso) =>
          piso.id_piso === action.payload.id_piso ? action.payload : piso
        ),
        pisoSeleccionado: null,
        mensaje_piso: { msg: 'Piso editado exitosamente', type: 'success' },
      };
    case PISO_ACTUAL:
      return {
        ...state,
        pisoSeleccionado: state.pisos.filter(
          (piso) => piso.id_piso === action.payload
        ),
        mensaje_piso: null,
      };
    case AMBIENTES_PISO:
      return {
        ...state,
        ambientesPiso: state.pisos.filter(
          (piso) => piso.id_piso === action.payload
        ),
        mensaje_piso: null,
      };
    case BAJA_PISO:
      return {
        ...state,
        pisos: state.pisos.filter((piso) => piso.id_piso !== action.payload),
        mensaje_piso: { msg: 'Piso eliminado exitosamente', type: 'success' },
      };
    case PISO_ERROR:
      return {
        ...state,
        mensaje_piso: action.payload,
      };
    case LIMPIAR_PISO:
      return {
        ...state,
        pisoSeleccionado: null,
        mensaje_piso: null,
        formulario: false,
      };
    case LIMPIAR_AMBIENTES_PISO:
      return {
        ...state,
        ambientesPiso: null,
        formulario: false,
      };
    case FORMULARIO_PISO:
      return {
        ...state,
        formulario: true,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        mensaje_piso: null,
      };
    default:
      return state;
  }
};
