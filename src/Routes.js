import React from "react";
import { Switch, Route } from "react-router-dom";
import Pages from "./Pages";

const Routes = () => {
  return (
    <Switch>
      <Route path="/pay" component={Pages.Payment} />
      <Route exact path="/register" component={Pages.Register} />
      <Route path="/u/:uid?/:amount?" component={Pages.QRCodePage} />
      <Route exact path="/" component={Pages.Home} />
    </Switch>
  );
};

export default Routes;
