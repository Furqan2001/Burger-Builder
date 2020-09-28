import React, { Component } from 'react';
import Aux from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css'
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawertoggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return(
      <Aux>
        <Toolbar isAuthenticated={this.props.isAuthenticated} open={this.sideDrawertoggleHandler}/>
        <SideDrawer isAuthenticated={this.props.isAuthenticated} show={this.state.showSideDrawer} close={this.sideDrawertoggleHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);