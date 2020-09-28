import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const buildControls = props => {
  const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
  ]

  return (
    <div className={classes.BuildControls}>
      <p>Total Price is <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl 
          key = {ctrl.label}
          label = {ctrl.label}
          addIngredient = {() => props.addIngredient(ctrl.type)}
          removeIngredient = {() => props.removeIngredient(ctrl.type)}
          disabledStatus = {props.disabled[ctrl.type]}
        />
      ))}
      <button 
        disabled={!props.purchaseable} 
        className={classes.OrderButton} 
        onClick={props.purchase}>{props.isAuthenticated ? 'ORDER NOW!' : 'SIGN UP TO ORDER'}</button>
    </div>
  );
};

export default buildControls;