// src/components/DeleteModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './DeleteModal.css';

Modal.setAppElement('#root');

const DeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleConfirm = () => {
        onConfirm(phoneNumber);
        setPhoneNumber('');
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="delete-modal" overlayClassName="delete-modal-overlay">
            <h2>Confirm Deletion</h2>
            <input
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="phone-number-input"
            />
            <button onClick={handleConfirm} className="confirm-button">Confirm</button>
            <button onClick={onRequestClose} className="cancel-button">Cancel</button>
        </Modal>
    );
};

export default DeleteModal;
