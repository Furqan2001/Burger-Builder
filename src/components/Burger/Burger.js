import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let ingredients = []; 
  let transformedIngredientsKey = Object.keys(props.ingredients);
  let transformedIngredientsValues = Object.values(props.ingredients);
  for (let i=0; i<transformedIngredientsKey.length; i++) {
    let ingredientAmount = transformedIngredientsValues[i];
    for (let j=0; j<ingredientAmount; j++) {
      let newIngredient = <BurgerIngredient key={transformedIngredientsKey[i] + j} type={transformedIngredientsKey[i]} />
      ingredients.push(newIngredient);
    }
  }

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {ingredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}

export default burger;