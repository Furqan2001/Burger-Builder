import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredient
  }
}

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredient
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-burger-builder-23efb.firebaseio.com/ingredients.json')
    .then(response => {
      const ingredients = {
        salad: response.data.salad,
        cheese: response.data.cheese,
        meat: response.data.meat,
        bacon: response.data.bacon
      };
      dispatch(setIngredients(ingredients));
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed());
    })
  }
}