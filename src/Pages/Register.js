import React, { useState } from "react";
import AuthService from "../services/auth.service";
import fixedMessage from "../services/errors.service";
import Validator from "../Components/FormsValidationRules";

import "../App.css";

const Register = (props) => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    address: "",
  });
  const [errors, setErrors] = useState("");
  const [successful, setSuccessful] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors("");
    setSuccessful(false);

    const problems = Validator.validate(registerForm);
    if (problems === "") {
      // Register in the Database
      AuthService.register(registerForm.username, registerForm.address)
        .then((response) => {
          setSuccessful(true);
          props.history.push("/u/" + registerForm.username);
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
      console.log(problems);
      setErrors(problems);
      setSuccessful(false);
    }
  };

  const handleChange = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const { username, address } = registerForm;
  return (
    <div className="container">
      {!successful && <div className="row error">{errors}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label>Address</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              placeholder="ban_123..."
              required
            />
          </div>
        </div>

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
              placeholder="username"
              required
            />
          </div>
        </div>

        <div className="row">
          <input type="submit" className="right-button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default Register;
