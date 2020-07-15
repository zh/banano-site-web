import isValid from "nano-address-validator";

function isSpecial(username) {
  if (!username || username.length < 3 || username.length > 32) {
    return true;
  }
  const specialNames = [
    "pay",
    "ban",
    "banano",
    "api",
    "v1",
    "account",
    "root",
    "admin",
    "test",
    "login",
    "logout",
    "signup",
    "register",
    "new",
    "create",
    "update",
    "delete",
  ];
  return specialNames.indexOf(username) > -1 ? true : false;
}

function validate(values) {
  let errors = "";
  if (!values.username) {
    errors = "Username is required";
  }
  if (isSpecial(values.username) === true) {
    errors = "Invalid username";
  }
  if (!/^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/.test(values.username)) {
    errors = "Invalid username: " + values.username;
  }
  if (!values.address) {
    errors = "Address is required";
  }
  if (!isValid(values.address, ["ban"])) {
    errors = "Invalid Banano address: " + values.address;
  }
  return errors;
}

export default {
  isSpecial,
  validate,
};
