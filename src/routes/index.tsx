import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import { Container } from './styles';
import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/repository/:repository+" component={Repository} />
    </Switch>
  );
};

export default Routes;
