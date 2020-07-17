import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";

const Home = (props) => {
  const [paymentForm, setPaymentForm] = useState({
    username: "",
  });

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.history.push("/u/" + username);
    window.location.reload();
  };

  const { username } = paymentForm;
  return (
    <div className="container">
      <h2>Banano Services</h2>
      <div>
        <h3>Pay to any address with QR code</h3>
        Go to <Link to="/pay">Payment</Link> page, fill address and amount of
        BANANO and press "Pay" button. Will give you nice QR code to do the
        payment.
      </div>
      <div>
        <h3>Register your username and address</h3>
        <div>
          BANANO addresses are pretty long and impossible to remember.
          Registering will connect your address to easy to remember username and
          allow you to have a shorter URL with QR code for payments (see below).
        </div>
        <div>
          Go to <Link to="/register">Register</Link> page, fill the form and
          claim your username with pressing "Save" button.
        </div>
        <div>
          Avoid using special words, like <i>root,admin,test</i> etc. for
          username
        </div>
      </div>
      <div>
        <h3>Easy URL for QR code payments</h3>
        <div>
          Register your username and send your friends to{" "}
          <b>https://banano.site/u/your_username</b>, so they can easy pay you
          with QR code.
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-25">
                <label>
                  Try some username (example: <b>zhesto</b>):
                </label>
              </div>
              <div className="col-25">
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
              <input
                type="submit"
                className="left-button"
                value="Pay with QR code"
              />
            </div>
          </form>
        </div>
      </div>
      <div>
        <h3>REST API</h3>
        <pre>GET http://api.banano.site/u/some_username</pre>
        will return JSON data, containing BANANO address for some username, if
        such information is saved. Example:
        <pre>
          GET http://api.banano.site/u/test123
          <br />
          <br />
          {JSON.stringify(
            { username: "test123", address: "ban_1qt..." },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

export default Home;
