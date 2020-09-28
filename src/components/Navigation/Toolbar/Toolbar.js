import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div className={classes.DrawerToggle} onClick={props.open}>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div style={{height: '80%'}}>
      <Logo />
    </div>
    <nav className={classes.MobileOnly}>
      <NavigationItems isAuthenticated={props.isAuthenticated} />
    </nav>
  </header>
);

export default toolbar;