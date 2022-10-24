import React, { useEffect, useRef, useState } from 'react';
import { CardActivo } from '../components/CardActivo';
import clienteAxios from '../config/axios';

export const EscanerCodigoBarra = () => {
  const video = useRef(null);
  const canvas = useRef(null);

  const [barcode, setBarcode] = useState(null);
  const [activo, setActivo] = useState(null);
  const [noresult, setNoresult] = useState(null);

  function deshabilitaRetroceso() {
    window.location.hash = 'no-back-button';
    window.location.hash = 'Again-No-back-button'; //chrome
    window.onhashchange = function () {
      window.location.hash = 'no-back-button';
    };
  }
  useEffect(() => {
    deshabilitaRetroceso();
    const getActivo = async () => {
      try {
        const response = await clienteAxios.get(
          `/api/activos/codigo/${barcode}`
        );
        if (response.data) {
          setActivo(response.data);
          setNoresult(null);
        } else {
          setActivo(null);
          setNoresult('Activo no registrado en la base de datos');
        }
      } catch (error) {
        console.log(error);
        setNoresult('Activo no registrado en la base de datos');
      }
    };
    if (barcode) {
      getActivo();
    }
  }, [barcode]);

  let openCamara = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { exact: 'environment' } } })
      .then((stream) => {
        video.current.srcObject = stream;
        video.current.play();
        // const canvas2 = canvas.current;
        const ctx = canvas.current.getContext('2d');
        const barcodeDetector = new window.BarcodeDetector({
          formats: ['code_128', 'codabar', 'ean_13'],
        });
        setInterval(() => {
          canvas.current.width = 280;
          canvas.current.height = 300;
          ctx.drawImage(
            video.current,
            0,
            0,
            video.current.videoWidth,
            video.current.videoHeight
          );
          barcodeDetector
            .detect(canvas.current)
            .then(([data]) => {
              if (data) {
                setBarcode(data.rawValue);
              }
            })
            .catch((err) => console.log(err));
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  console.log(window.location.pathname);
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 text-center py-3">
          <button className="btn btn-primary" onClick={openCamara} key={48}>
            Encender camara
          </button>
        </div>
        <div className="col-6 text-center py-3">
          <a className="btn btn-primary" href="http://127.0.0.1:5173/homeApp">Volver</a>
        </div>
        <div className="col-12">
          <video key={153} ref={video} width="300px" autoPlay muted hidden />
          <canvas
            key={8965}
            ref={canvas}
            // width="150px"
            // height="200px"
            className="border border-dark border-5 rounded  w-100"
          />
        </div>
        {barcode && [
          <div className="col-12 text-center py-4" key={351}>
            <b key={65}>Código escaneado:</b> {barcode}
          </div>,
        ]}
        {activo ? <CardActivo activo={activo} key={1654153} /> : null}
        {noresult ? <p key={526}>{noresult}</p> : null}
      </div>
    </div>
  );
};
