import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CodeGenerator from './codegenerator/codegenerator.jsx';
import Gradients from './gradients/gradients.jsx';
import About from './about/about.jsx';
import Modify from './modify/modify.jsx';
import ErrorPage from './error/error.jsx';

const Routing = () => (
    <Switch>
        <Route exact path="/" component={CodeGenerator} />
        <Route path="/index" component={CodeGenerator} />
        <Route path="/home" component={CodeGenerator} />
        <Route path="/gradients" component={Gradients} />
        <Route path="/user-gradients" component={Gradients} />
        <Route path="/about" component={About} />
        <Route path="/modify" component={Modify} />
        <Route path="/*" component={ErrorPage} />
    </Switch>
);

export default Routing;