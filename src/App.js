import React, { Component, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthStatus } from './store/actions/index';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignIN();
  } 
  
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/auth' render={props => <Auth {...props} />} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/orders' render={props => <Orders {...props} />} />
          <Route path='/checkout' render={props => <Checkout {...props} />} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' render={props => <Auth {...props} />} />
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIN: () => dispatch(checkAuthStatus())
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);
