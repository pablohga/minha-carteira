import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* import SignIn from '../Pages/SignIn'; */
import SingIn from '../Pages/SignIn/index';

const AuthRoutes: React.FC = () => (
  <Switch>
    <Route path="/" component={SingIn} />
  </Switch>
);

export default AuthRoutes;
