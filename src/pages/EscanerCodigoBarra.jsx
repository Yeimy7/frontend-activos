import React, { useEffect, useRef, useState } from 'react';
import { CardActivo } from '../components/CardActivo';
import clienteAxios from '../config/axios';

export const EscanerCodigoBarra = () => {
  const video = useRef(null);
  const canvas = useRef(null);

  const [barcode, setBarcode] = useState(null);
  const [activo, setActivo] = useState(null);
  const [noresult, setNoresult] = useState(null);
  const [running, setRunning] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [showMessage, setShowMessage] = useState('');

  const verifica = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: { exact: 'environment' } } })
        .then(function (stream) {
          // showMessage('¡Tienes una cámara!');
          enableCamera();
        })
        .catch(function (error) {
          setShowMessage('No tienes una cámara o no has dado permiso.');
        });
    } else {
      setShowMessage(
        'Tu navegador no es compatible con la API de MediaDevices.'
      );
    }
  };

  const enableCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: 'environment' } },
      });
      setRunning(newStream);
      video.current.srcObject = newStream;
      video.current.play();
      // const canvas2 = canvas.current;
      const ctx = canvas.current.getContext('2d');
      const barcodeDetector = new window.BarcodeDetector({
        formats: ['code_128', 'codabar', 'ean_13'],
      });
      const newIntervalId = setInterval(() => {
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
      setIntervalId(newIntervalId);
    } catch (error) {
      console.error('Error al encender la cámara:', error);
    }
  };

  const turnOnCamera = () => {
    if (!running) {
      // enableCamera();
      verifica();
    }
  };

  const turnOffCamera = () => {
    if (running) {
      running.getTracks().forEach((track) => {
        track.stop();
      });
      setRunning(null);
      setBarcode(null);
      setRunning(null);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  const getActivo = async () => {
    try {
      const response = await clienteAxios.get(`/api/activos/codigo/${barcode}`);
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
  useEffect(() => {
    if (barcode) {
      getActivo();
    }
    return () => {
      // Apagamos la cámara cuando el componente se desmonta
      if (running) {
        running.getTracks().forEach((track) => track.stop());
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [barcode, running, intervalId]);

  return (
    <div className="container">
      <div className="row">
        {!barcode ? (
          <div className="col-12 text-center py-3">
            <button
              className="btn btn-primary m-1"
              onClick={turnOnCamera}
              key={48525656}
            >
              Habilitar cámara
            </button>
            <button
              className="btn btn-danger m-1"
              onClick={turnOffCamera}
              key={48471}
            >
              Apagar cámara
            </button>
          </div>
        ) : (
          <div className="col-12 text-center py-3">
            <button
              className="btn btn-success"
              onClick={turnOffCamera}
              key={48471}
            >
              Escanear otro codigo
            </button>
          </div>
        )}

        {showMessage==='' ? (
          <div className="col-12">
            <video key={153} ref={video} width="300px" autoPlay muted hidden />
            <canvas
              key={8965}
              ref={canvas}
              // width="150px"
              // height="200px"
              className="border border-muted border-2 rounded  w-100"
            />
          </div>
        ) : (
          <p className='fs-3 text-muted text-center'>{showMessage}</p>
        )}
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
