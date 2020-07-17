import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = (props) => {
  const handleColapse = (e) => {
    e.preventDefault();
    var x = document.getElementById("topNav");
    if (x.className === "nav-header") {
      x.className += " responsive";
    } else {
      x.className = "nav-header";
    }
  };

  return (
    <nav id="topNav" className="nav-header">
      <Link to="/">Home</Link>
      <Link to="/pay">Payment</Link>
      <Link to="/register">Register</Link>
      <a href="/pay" className="icon" onClick={handleColapse}>
        <i className="fa fa-bars"></i>
      </a>
    </nav>
  );
};

export default Nav;
