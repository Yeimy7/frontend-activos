import React from 'react'
import { Modal } from './Modal'

export const ModalActionConfirm = ({stateModal, setStateModal}) => {
  return (
    <Modal stateModal={stateModal} setStateModal={setStateModal}>
        <div className='container'>
            <div container-fluid>
                <input type='text' placeholder='Introduzca su contraseña'/>
            </div>
        </div>
    </Modal>
  )
}
