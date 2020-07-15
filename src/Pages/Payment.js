import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import isValid from "nano-address-validator";
import useStickyState from "../Components/UseStickyState";
import Validator from "../Components/PaymentFormValidationRules";
import fixedMessage from "../services/errors.service";
import AuthService from "../services/auth.service";

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

const Payment = (props) => {
  const uid = !Validator.isSpecial(props.match.params.uid)
    ? props.match.params.uid
    : "";
  const [user, setUser] = useStickyState(null, "user");
  // states
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    address: "",
    label: "",
    username: uid || "",
  });

  useEffect(() => {
    if (uid) {
      AuthService.getUserByUsername(uid)
        .then((response) => {
          const addr =
            (response && response.data && response.data.address) || "";
          if (addr !== "") {
            setUser(JSON.stringify(response.data));
            setSuccessful(true);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.error) ||
            error.message ||
            error.toString();

          setUser(null);
          setErrors(fixedMessage(resMessage));
          setSuccessful(false);
        });
    } else {
      setUser(null);
    }
  }, [uid, user, setUser]);

  // form falidation
  const [errors, setErrors] = useState("");
  const [successful, setSuccessful] = useState(false);

  // Modal QR code
  const [modalIsOpen, setIsOpen] = useState(false);

  // copy to clipboard
  const [copySuccess, setCopySuccess] = useState("");
  const addressRef = useRef(null);

  function openModal() {
    let address = paymentForm.address || "";
    if (address === "") {
      address = currentUser || currentUser.address ? currentUser.address : "";
    }
    if (address !== "" && isValid(address, ["ban"])) {
      setIsOpen(true);
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
    closeModal();
  };

  const handleSave = (e) => {
    e.preventDefault();
    const err = Validator.validate(paymentForm);
    if (err === "") {
      AuthService.register(paymentForm.username, paymentForm.address)
        .then((response) => {
          setUser(JSON.stringify(response.data));
          setSuccessful(true);
          props.history.push("/pay/" + paymentForm.username);
          window.location.reload();
        })
        .catch((error) => {
          const resMessage =
            (error &&
              error.response &&
              error.response.data &&
              error.response.data.error) ||
            error.message ||
            error.toString();

          console.log("Save ERROR: ", resMessage);
          setErrors(fixedMessage(resMessage));
          setSuccessful(false);
        });
    } else {
      setErrors(err);
      console.log(err);
      setSuccessful(false);
    }
  };

  const { amount, label, address, username } = paymentForm;
  const currentUser = username ? JSON.parse(user) : null;
  return (
    <div className="container">
      {username && !successful && <div className="row error">{errors}</div>}
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
              value={(currentUser && currentUser.address) || address}
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
              placeholder="100"
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
        {uid && !currentUser && (
          <>
            <div className="row">
              <div className="col-25">
                <label>Username</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="username..."
                  required
                />
              </div>
            </div>
            <div className="row">
              <button className="right-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </>
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
            address={(currentUser && currentUser.address) || address}
            label={label}
          />
        </Modal>
      </form>
    </div>
  );
};

export default Payment;
