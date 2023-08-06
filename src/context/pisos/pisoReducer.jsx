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
        categoria: 'success',
      };
      return {
        ...state,
        pisos: [action.payload, ...state.pisos],
        mensaje: alerta,
        formulario: false,
      };
    case ACTUALIZAR_PISO:
      return {
        ...state,
        pisos: state.pisos.map((piso) =>
          piso.id_piso === action.payload.id_piso ? action.payload : piso
        ),
        pisoSeleccionado: null,
        mensaje: null,
      };
    case PISO_ACTUAL:
      return {
        ...state,
        pisoSeleccionado: state.pisos.filter(
          (piso) => piso.id_piso === action.payload
        ),
        mensaje: null,
      };
    case AMBIENTES_PISO:
      return {
        ...state,
        ambientesPiso: state.pisos.filter(
          (piso) => piso.id_piso === action.payload
        ),
        mensaje: null,
      };
    case BAJA_PISO:
      return {
        ...state,
        pisos: state.pisos.filter((piso) => piso.id_piso !== action.payload),
      };
    case PISO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_PISO:
      return {
        ...state,
        pisoSeleccionado: null,
        mensaje: null,
        formulario: false,
      };
      case LIMPIAR_AMBIENTES_PISO:
        return {
          ...state,
          ambientesPiso: null,
          formulario:false
        };
    case FORMULARIO_PISO:
      return {
        ...state,
        formulario: true,
      };
    default:
      return state;
  }
};
