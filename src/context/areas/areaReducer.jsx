import {
  AGREGAR_AREA,
  BAJA_AREA,
  OBTENER_AREAS,
  AREA_ERROR,
  AREA_ACTUAL,
  LIMPIAR_AREA,
  ACTUALIZAR_AREA,
  RESET_MESSAGE,
} from '../../types';
export const areaReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_AREAS:
      return {
        ...state,
        areas: action.payload,
      };
    case AGREGAR_AREA:
      const alerta = {
        msg: 'Área creada exitosamente',
        type: 'success',
      };
      return {
        ...state,
        areas: [...state.areas, action.payload],
        mensaje: alerta,
      };
    case ACTUALIZAR_AREA:
      return {
        ...state,
        areas: state.areas.map((area) =>
          area.id_area === action.payload.id_area ? action.payload : area
        ),
        area: null,
        mensaje: { msg: 'Área editada exitosamente', type: 'success' },
      };
    case AREA_ACTUAL:
      return {
        ...state,
        area: state.areas.filter((area) => area.id_area === action.payload),
        mensaje: null,
      };
    case BAJA_AREA:
      return {
        ...state,
        areas: state.areas.filter((area) => area.id_area !== action.payload),
        mensaje: { msg: 'Área eliminada exitosamente', type: 'success' },
      };
    case AREA_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_AREA:
      return {
        ...state,
        area: null,
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
