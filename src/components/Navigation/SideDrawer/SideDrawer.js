import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const sideDrawer = props => {
  let assignedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    assignedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.close} />
      <div className={assignedClasses.join(' ')} onClick={props.close}>
        <div style={{height: '20%', marginBottom: '32px'}}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;