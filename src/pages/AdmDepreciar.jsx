import React, { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import DepreciacionContext from '../context/depreciacion/depreciacionContext';
import { muestraMensaje } from '../helpers/muestraMensaje';
import { useForm } from '../hooks/useForm';

export const AdmDepreciar = () => {
  const depreciacionContext = useContext(DepreciacionContext);
  const {
    gestion,
    obtenerGestion,
    realizarDepreciacion,
    mensaje_depreciacion,
  } = depreciacionContext;

  const initialForm = {
    ufv_actual: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { ufv_actual } = formValues;

  useEffect(() => {
    // Si hay un error
    if (mensaje_depreciacion) {
      muestraMensaje(mensaje_depreciacion.msg, mensaje_depreciacion.type);
    }
    obtenerGestion();
  }, [mensaje_depreciacion]);

  const handleDepreciar = async () => {
    if (!ufv_actual) {
      muestraMensaje('Debe introducir el valor UFV actual', 'error');
      return;
    }
    try {
      Swal.fire({
        icon: 'warning',
        html: `
        <h1>¿Está seguro?</h1>
        <p> Desea realizar la depreciacion de la gestión ${gestion + 1}</p>
        `,
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#0D6EFD',
      }).then((result) => {
        if (result.isConfirmed) {
          depreciar();
        }
        reset();
      });
    } catch (error) {
      reset();
      muestraMensaje('Error, vuelva a intentarlo por favor', 'error');
      return;
    }
  };
  const depreciar = async () => {
    Swal.fire({
      title: '<p></p>',
      html: '<h2>Realizando depreciación de activos...</h2>',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      if (!gestion) return;
      realizarDepreciacion({ ufv_actual, gestion });
      reset();
    } catch (error) {
      muestraMensaje(error, 'error');
      Swal.close();
    }
  };
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1>Depreciación de activos</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <div className="card card-info mb-3">
                <div className="card-header text-center">
                  <h3>Depreciar activos</h3>
                </div>
                <div className="card-body">
                  <div className="row g-3 align-items-center mb-2">
                    <div className="col-12">
                      <label
                        htmlFor="ufv_actual"
                        className="col-form-label font-weight-bold"
                      >
                        <b>UFV actual:</b>
                      </label>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="ufv_actual"
                          name="ufv_actual"
                          autoComplete="off"
                          value={ufv_actual}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-3 align-items-center mb-2 text-center ">
                    <button
                      className="btn btn-danger mt-4 mb-4"
                      onClick={handleDepreciar}
                    >
                      Realizar Depreciacion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
