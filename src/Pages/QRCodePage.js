import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import "../Components/ModalQR.css";
import { getSendURI } from "banano-uri-generator";
import { banToRaw } from "banano-unit-converter";
import Validator from "../Components/FormsValidationRules";
import AuthService from "../services/auth.service";

const QRCodePage = (props) => {
  const uid_param = !Validator.isSpecial(props.match.params.uid)
    ? props.match.params.uid
    : "";
  const amount_param = /^[0-9]+$/.test(props.match.params.amount)
    ? props.match.params.amount
    : "";

  const [copySuccess, setCopySuccess] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");

  const [valueForm, setValueForm] = useState({
    amount: amount_param,
    label: "",
  });

  useEffect(() => {
    setCopySuccess("");
    // find BANANO address from username
    if (uid_param && uid_param !== username) {
      setUsername(uid_param);
      AuthService.getUserByUsername(uid_param)
        .then((response) => {
          const addr =
            (response && response.data && response.data.address) || "";
          if (addr !== "") {
            setAddress(addr);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          setAddress("");
        });
    }
  }, [uid_param, username, setAddress, valueForm]);

  const handleChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(e.target.textContent);
    setCopySuccess("Copied!");
  };

  const addressToURL = (addr, amount, label) => {
    let rawAmount = "";
    try {
      rawAmount = banToRaw(amount);
    } catch (e) {
      rawAmount = "";
    }
    return getSendURI(addr, rawAmount, label);
  };

  const titleFromAmount = (amount) => {
    return username + " " + (amount ? amount : " with ");
  };

  const { amount, label } = valueForm;
  return (
    address !== "" && (
      <div className="container">
        <div className="row">
          <div className="qr-title">Pay {titleFromAmount(amount)} BAN</div>
        </div>
        <div className="row">
          <div className="col-center">
            <QRCode value={addressToURL(address, amount, label)} />
          </div>
        </div>
        <div className="row">
          <div className="col-center qr-text" onClick={copyToClipboard}>
            {address}
          </div>
        </div>
        <div className="row">
          <div className="col-center qr-copy">{copySuccess}</div>
        </div>
        <form>
          <div className="row">
            <div className="col-center">
              <input
                type="text"
                name="amount"
                value={amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-center">
              <input
                type="text"
                name="label"
                value={label}
                onChange={handleChange}
                placeholder="label (optional)"
              />
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default QRCodePage;
