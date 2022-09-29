import React from 'react';
import { FaTimes } from 'react-icons/fa';

export const Modal = ({
  children,
  stateModal,
  setStateModal,
  title = '',
  size = '',
  btnClose = true,
}) => {
  return (
    <>
      {stateModal && (
        <div className="overlay">
          <div
            className={`container bg-light position-relative rounded w-${
              !size ? '75' : size
            }`}
          >
            <div className="container-fluid p-3">
              {title !== '' ? (
                <div className="row border-bottom">
                  <div className="col-md-9 mb-2 ">
                    <h3 className="fw-bold">{title}</h3>
                  </div>
                </div>
              ) : (
                ''
              )}
              {btnClose ? (
                <div className="col-md-3">
                  <button
                    className="btn btn-light position-absolute top-0 end-0 m-2"
                    onClick={() => setStateModal(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : null}
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
