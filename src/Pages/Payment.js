import React, { useState, useRef } from "react";
import Modal from "react-modal";
import isValid from "nano-address-validator";

import "../App.css";
import "./Payment.css";
import ModalQR from "../Components/ModalQR";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
};

Modal.setAppElement("#root");

const Payment = () => {
  // states
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    address: "",
    label: "",
  });

  // form falidation
  const [errors, setErrors] = useState("");
  const [successful, setSuccessful] = useState(false);

  // Modal QR code
  const [modalIsOpen, setIsOpen] = useState(false);

  // copy to clipboard
  const [copySuccess, setCopySuccess] = useState("");
  const addressRef = useRef(null);

  function openModal() {
    setSuccessful(false);
    setErrors("");
    let address = paymentForm.address || "";
    if (address !== "" && isValid(address, ["ban"])) {
      setErrors("");
      setSuccessful(true);
      setIsOpen(true);
    } else {
      setSuccessful(false);
      setErrors("Invalid BANANO address");
    }
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("Modal is open");
  }

  function closeModal() {
    setIsOpen(false);
  }

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(addressRef.current.value);
    setCopySuccess(" (copied!)");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
    setErrors("");
    closeModal();
  };

  const { amount, label, address } = paymentForm;
  return (
    <div className="container">
      {!successful && <div className="row error">{errors}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <img
              id="copy-logo"
              src="/copy.svg"
              alt=""
              onClick={copyToClipboard}
            />
            <label>Address{copySuccess}</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="address"
              ref={addressRef}
              value={address}
              onChange={handleChange}
              placeholder="ban_123..."
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Amount</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Label</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="label"
              value={label}
              onChange={handleChange}
              placeholder="label"
            />
          </div>
        </div>
        {!modalIsOpen && (
          <div className="row">
            <input type="submit" className="right-button" value="Pay" />
          </div>
        )}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Banano Payment"
        >
          <ModalQR
            closeModal={closeModal}
            amount={amount}
            address={address}
            label={label}
          />
        </Modal>
      </form>
    </div>
  );
};

export default Payment;
