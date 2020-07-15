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
    props.history.push("/pay/" + username);
    window.location.reload();
  };

  const { username } = paymentForm;
  return (
    <div className="container">
      <h2>Banano Services</h2>
      <div>
        <h3>QR payments code</h3>
        Go to <Link to="/pay">Payment</Link> page, fill address and amount of
        BANANO and press "Pay" button. Will give you nice QR code to do the
        payment.
      </div>
      <div>
        <h3>Prefilled payment form</h3>
        <div>
          Go to <b>https://banano.site/pay/your_username</b>. If somebody
          already using that username, the address in the form will be
          prefilled.
          <br /> If not, fill the form and claim that username with pressing
          "Save" button.
        </div>
        <div>
          Avoid using special words, like <i>root,admin,test</i> etc. for
          username
        </div>
        <div>
          In the future send your friends to{" "}
          <b>https://banano.site/pay/your_username</b>, so they can easy pay you
          with one button click.
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-25">
                <label>Try some username:</label>
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
              <input type="submit" className="right-button" value="Pay" />
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
