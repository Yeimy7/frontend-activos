import {
  AGREGAR_ACTIVO,
  BAJA_ACTIVO,
  OBTENER_ACTIVOS,
  ACTIVO_ERROR,
  ACTIVO_ACTUAL,
  LIMPIAR_ACTIVO,
  ACTUALIZAR_ACTIVO,
  ACTUALIZAR_IMAGEN_ACTIVO,
  ACTIVO_OBTENER_AUXILIARES,
  ACTIVO_OBTENER_GRUPOS,
  ACTIVO_OBTENER_AMBIENTES,
  EDITAR_IMAGEN_ACTIVO,
  OBTENER_ACTIVOS_ASIGNADOS,
  OBTENER_ACTIVOS_NO_ASIGNADOS,
  ASIGNAR_ACTIVO,
  DESVINCULAR_ACTIVO,
  ACTIVO_A_DEVOLVER,
  LIMPIAR_ACTIVO_A_DEVOLVER,
  ACTIVO_BAJA,
  LIMPIAR_ACTIVO_BAJA,
  ACTIVO_A_TRASLADAR,
  LIMPIAR_ACTIVO_A_TRASLADAR,
  TRASLADO_ACTIVO,
} from '../../types';
export const activoReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_ACTIVOS:
      return {
        ...state,
        activos: action.payload,
      };
    case OBTENER_ACTIVOS_ASIGNADOS:
      return {
        ...state,
        activosAsignados: action.payload,
      };
    case OBTENER_ACTIVOS_NO_ASIGNADOS:
      return {
        ...state,
        activosNoAsignados: action.payload,
      };
    case ACTIVO_OBTENER_AUXILIARES:
      return {
        ...state,
        auxiliares: action.payload,
      };
    case ACTIVO_OBTENER_GRUPOS:
      return {
        ...state,
        grupos: action.payload,
      };
    case ACTIVO_OBTENER_AMBIENTES:
      return {
        ...state,
        ambientes: action.payload,
      };
    case AGREGAR_ACTIVO:
      // const alerta = {
      //   msg: 'Área creada exitosamente',
      //   categoria: 'success',
      // };
      return {
        ...state,
        activos: [...state.activos, action.payload],
        // mensaje: alerta,
      };
    case ACTUALIZAR_ACTIVO:
      return {
        ...state,
        activos: state.activos.map((activo) => {
          if (activo.id_activo === action.payload.id_activo) {
            const updActivo = {
              id_activo: activo.id_activo,
              codigo_activo: activo.codigo_activo,
              fecha_ingreso: action.payload.fecha_ingreso,
              descripcion_activo: action.payload.descripcion_activo,
              img_activo: activo.img_activo,
              estado: activo.estado,
              'ambiente.codigo_ambiente': activo['ambiente.codigo_ambiente'],
              'ambiente.tipo_ambiente': activo['ambiente.tipo_ambiente'],
              'auxiliar.descripcion_aux': activo['auxiliar.descripcion_aux'],
              'grupo_contable.descripcion_g':
                activo['grupo_contable.descripcion_g'],
              'proveedor.razon_social': activo['proveedor.razon_social'],
            };
            return updActivo;
          }
          return activo;
        }),
        activo: null,
        mensaje: null,
      };
    case ACTUALIZAR_IMAGEN_ACTIVO:
      console.log(action.payload);
      return {
        ...state,
        activos: state.activos.map((activo) => {
          if (activo.id_activo === action.payload.id_activo) {
            const updActivo = {
              ...activo,
              img_activo: action.payload.img_activo,
            };
            return updActivo;
          }
          return activo;
        }),
        activo: null,
        imagenActivo: false,
        mensaje: null,
      };
    case EDITAR_IMAGEN_ACTIVO:
      return {
        ...state,
        activo: state.activos.filter(
          (activo) => activo.id_activo === action.payload
        ),
        imagenActivo: true,
        mensaje: null,
      };
    case ACTIVO_ACTUAL:
      return {
        ...state,
        activo: state.activos.filter(
          (activo) => activo.id_activo === action.payload
        ),
        mensaje: null,
      };
    case ACTIVO_A_DEVOLVER:
      return {
        ...state,
        activoADevolver: state.activosAsignados.filter(
          (activo) => activo.id_activo === action.payload
        ),
        mensaje: null,
      };
    case ACTIVO_BAJA:
      return {
        ...state,
        activoBaja: state.activos.filter(
          (activo) => activo.id_activo === action.payload
        ),
        mensaje: null,
      };
    case ACTIVO_A_TRASLADAR:
      return {
        ...state,
        activoTraslado: state.activos.filter(
          (activo) => activo.id_activo === action.payload
        ),
        mensaje: null,
      };
    case BAJA_ACTIVO:
      return {
        ...state,
        activos: state.activos.filter(
          (activo) => activo.id_activo !== action.payload
        ),
      };
    case ACTIVO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_ACTIVO:
      return {
        ...state,
        activo: null,
        imagenActivo: false,
        mensaje: null,
      };
    case LIMPIAR_ACTIVO_A_DEVOLVER:
      return {
        ...state,
        activoADevolver: null,
        mensaje: null,
      };
    case LIMPIAR_ACTIVO_BAJA:
      return {
        ...state,
        activoBaja: null,
        mensaje: null,
      };
    case LIMPIAR_ACTIVO_A_TRASLADAR:
      return {
        ...state,
        activoTraslado: null,
        mensaje: null,
      };
    case ASIGNAR_ACTIVO:
      return {
        ...state,
        activosAsignados: [action.payload, ...state.activosAsignados],
        activosNoAsignados: state.activosNoAsignados.filter(
          (activo) => activo.id_activo !== action.payload.id_activo
        ),
      };
    case DESVINCULAR_ACTIVO:
      return {
        ...state,
        activosNoAsignados: [action.payload, ...state.activosNoAsignados],
        activosAsignados: state.activosAsignados.filter(
          (activo) => activo.id_activo !== action.payload.id_activo
        ),
      };
    case TRASLADO_ACTIVO:
      return {
        ...state,
        activos: state.activos.map((activo) => {
          if (activo.id_activo === action.payload.id_activo) {
            const updActivo = {
              ...activo,
              fecha_asig_ambiente: action.payload.fecha_asig_ambiente,
              'ambiente.codigo_ambiente':
                action.payload.codigo_ambiente,
              'ambiente.tipo_ambiente':
                action.payload.tipo_ambiente,
            };
            return updActivo;
          }
          return activo;
        }),
        activoTraslado: null,
        mensaje: null,
      };
    default:
      return state;
  }
};
