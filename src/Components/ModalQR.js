import React, { useState } from "react";
import QRCode from "qrcode.react";
import "./ModalQR.css";
import { getSendURI } from "banano-uri-generator";
import { banToRaw } from "banano-unit-converter";

const ModalQR = (props) => {
  const { closeModal, address } = props;

  const [copySuccess, setCopySuccess] = useState("");

  let rawAmount = "";
  let amount = props.amount;
  try {
    rawAmount = banToRaw(props.amount);
  } catch (e) {
    if (amount !== "") {
      console.log("invalid amount: ", amount);
    }
    amount = " with ";
  }
  const label = props.label ? props.label : "";
  const bananoURI = getSendURI(address, rawAmount, label);

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(e.target.textContent);
    setCopySuccess("Copied!");
  };

  return (
    <>
      <div>
        <div className="qr-title">Pay {amount} BAN</div>
        <div>
          <QRCode value={bananoURI} />
        </div>
        <div className="qr-text" onClick={copyToClipboard}>
          {address}
        </div>
        <div className="qr-copy">{copySuccess}</div>
        {label && <div className="qr-text">{label}</div>}
        <p>
          <button onClick={closeModal}>Close</button>
        </p>
      </div>
    </>
  );
};

export default ModalQR;
