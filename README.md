# Banano Site Web Frontend

Easy [BANANO](https://banano.cc/) payments on the [Banano Site](https://banano.site/) project pages.

*banano-site-web* is a client side application, allowing interaction with the [REST API, running on the server side](https://github.com/zh/banano-site-api).

## Provided services

### QR payments code for any address

Go to [Payment page](https://banano.site/pay), fill address and amount of BANANO and press **"Pay"** button. This will give you nice **QR code** to do the payment.

### Prefilled payment form

Go to `https://banano.site/pay/your_username`. 

- If somebody already using that username, the **address in the form will be prefilled**. See for example [this page](https://banano.site/pay/zhesto).
- If not (will be *"Account not found"* message on the top), fill the form and claim that username with pressing **"Save"** button.

> Avoid using special words, like root,admin,test etc. for username

In the future send your friends to `https://banano.site/pay/your_username`, so they can easy **pay you with one button click**.

*TODO: do not use modal dialog for QR code display. Show directly the code and change it dynamically on amount change.*


## Build/Run

*banano-site-web* is JavaScript React application, using standard *react-scripts* for all tasks:

- Install required dependencies:

```bash
yarn install
```
- If needed fix the URL for the REST API endpoint in `src/services/auth.service.js`:

```js
const ApiURL = "http://127.0.0.1:8080/"; // change for your setup, trailing slash
```


- Start for development:

```bash
yarn start
```

- Production build (for deployments):

```bash
yarn build
```

## Contributing

 - Please open an issue or PR if you have a question or suggestion.