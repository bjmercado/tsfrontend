import React from 'react';
import { Router, Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

import Login from './Login';
import Dashboard from './admin/Dashboard';
import Users from './admin/Users'
import history from '../history';
import { UserProps } from '../props/UserProps';
import { inject, observer } from 'mobx-react';


const App: React.FunctionComponent<UserProps> = (user): JSX.Element => {
    const PrivateRoute = ({ component, ...rest }: RouteProps) => {
        if (!component) {
          throw Error("component is undefined");
        }
      
        const Component = component;
        const render = (props: RouteComponentProps<any>): React.ReactNode => {
          if (user.userStore!.isAuthenticated) {
            return <Component {...props} />;
          }
          return <Redirect to={{ pathname: '/' }} />
        };
      
        return (<Route {...rest} render={render} />);
    }

    return(
        <div>
            <Router history={history}>
                <Route path="/" exact component={Login}/>
                <Route path="/admin/" exact component={Dashboard}/>
                <Route path="/admin/users/" exact component={Users}/>
                {/* <PrivateRoute path="/admin/index" exact component={Dashboard}/> */}
            </Router>
        </div>
    );
} 

export default inject('userStore')(observer(App));