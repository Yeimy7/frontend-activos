import {
  AGREGAR_EDIFICIO,
  BAJA_EDIFICIO,
  OBTENER_EDIFICIOS,
  EDIFICIO_ERROR,
  EDIFICIO_ACTUAL,
  LIMPIAR_EDIFICIO,
  ACTUALIZAR_EDIFICIO,
  PISOS_EDIFICIO,
  RESET_MESSAGE,
  LIMPIAR_PISOS_EDIFICIO,
} from '../../types';
export const edificioReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_EDIFICIOS:
      return {
        ...state,
        edificios: action.payload,
      };
    case AGREGAR_EDIFICIO:
      const alerta = {
        msg: 'Edificio creado exitosamente',
        type: 'success',
      };
      return {
        ...state,
        edificios: [...state.edificios, action.payload],
        mensaje: alerta,
      };
    case ACTUALIZAR_EDIFICIO:
      return {
        ...state,
        edificios: state.edificios.map((edificio) =>
          edificio.id_edificio === action.payload.id_edificio
            ? action.payload
            : edificio
        ),
        edificio: null,
        mensaje: { msg: 'Edificio editado exitosamente', type: 'success' },
      };
    case EDIFICIO_ACTUAL:
      return {
        ...state,
        edificio: state.edificios.filter(
          (edificio) => edificio.id_edificio === action.payload
        ),
        mensaje: null,
      };
    case PISOS_EDIFICIO:
      return {
        ...state,
        pisosEdificio: state.edificios.filter(
          (edificio) => edificio.id_edificio === action.payload
        ),
        mensaje: null,
      };
    case LIMPIAR_PISOS_EDIFICIO:
      return {
        ...state,
        pisosEdificio: null,
        formulario: false,
      };
    case BAJA_EDIFICIO:
      return {
        ...state,
        edificios: state.edificios.filter(
          (edificio) => edificio.id_edificio !== action.payload
        ),
        mensaje: { msg: 'Edificio eliminado exitosamente', type: 'success' },
      };
    case EDIFICIO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_EDIFICIO:
      return {
        ...state,
        edificio: null,
        mensaje: null,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        mensaje: null,
      };
    default:
      return state;
  }
};
