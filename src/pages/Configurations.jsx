import React, { useState } from "react";
import { ModalActionConfirm } from "../components/modals/ModalActionConfirm";
import { ModalUserRegister } from "../components/modals/ModalUserRegister";

export const Configurations = () => {
  const [stateModal, setStateModal] = useState(false);
  const [stateModal2, setStateModal2] = useState(false);
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setStateModal(!stateModal)}
      >
        Modal1
      </button>
      <button
        className="btn btn-primary"
        onClick={() => setStateModal2(!stateModal2)}
      >
        Modal2
      </button>
      <ModalUserRegister stateModal={stateModal} setStateModal={setStateModal} />
      <ModalActionConfirm stateModal={stateModal2} setStateModal={setStateModal2}/>
    </div>
  );
};
