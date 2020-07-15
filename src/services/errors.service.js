function fixedMessage(message) {
  if (message.indexOf("violates unique constraint") > -1) {
    return "Account with such username or address already exists";
  }

  return message;
}

export default fixedMessage;
