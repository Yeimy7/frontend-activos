import {
  AGREGAR_PROVEEDOR,
  BAJA_PROVEEDOR,
  OBTENER_PROVEEDORES,
  PROVEEDOR_ERROR,
  PROVEEDOR_ACTUAL,
  LIMPIAR_PROVEEDOR,
  ACTUALIZAR_PROVEEDOR,
  RESET_MESSAGE,
} from '../../types';
export const proveedorReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_PROVEEDORES:
      return {
        ...state,
        proveedores: action.payload,
      };
    case AGREGAR_PROVEEDOR:
      const alerta = {
        msg: 'Entidad creada exitosamente',
        type: 'success',
      };
      return {
        ...state,
        proveedores: [...state.proveedores, action.payload],
        mensaje_proveedor: alerta,
      };
    case ACTUALIZAR_PROVEEDOR:
      return {
        ...state,
        proveedores: state.proveedores.map((proveedor) =>
          proveedor.id_proveedor === action.payload.id_proveedor
            ? action.payload
            : proveedor
        ),
        proveedor: null,
        mensaje_proveedor: {msg:'Entidad actualizada exitosamente', type:'success'},
      };
    case PROVEEDOR_ACTUAL:
      return {
        ...state,
        proveedor: state.proveedores.filter(
          (proveedor) => proveedor.id_proveedor === action.payload
        ),
        mensaje_proveedor: null,
      };
    case BAJA_PROVEEDOR:
      return {
        ...state,
        proveedores: state.proveedores.filter(
          (proveedor) => proveedor.id_proveedor !== action.payload
        ),
        mensaje_proveedor:{msg:'Entidad eliminada exitosamente', type:'success'}
      };
    case PROVEEDOR_ERROR:
      return {
        ...state,
        mensaje_proveedor: action.payload,
      };
    case LIMPIAR_PROVEEDOR:
      return {
        ...state,
        proveedor: null,
        mensaje_proveedor: null,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        mensaje_proveedor: null,
      };
    default:
      return state;
  }
};
