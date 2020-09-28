import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls  from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux'; 
import { addIngredient, removeIngredient, initIngredients, purchaseInit, setAuthRedirectPath } from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients)
      .reduce((sum, el) => {
        return sum + el;
      },0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  cancelPurchaseHandler = () => {
    this.setState({purchasing: false});
  }

  continuePurchaseHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls  
            addIngredient = {this.props.onAddIngredient}
            removeIngredient = {this.props.onRemoveIngredient}
            disabled = {disabledInfo}
            price = {this.props.totalPrice}
            purchaseable = {this.updatePurchaseState(this.props.ingredients)}
            purchase = {this.purchaseHandler}
            isAuthenticated = {this.props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = <OrderSummary 
        ingredients={this.props.ingredients}
        cancelPurchase = {this.cancelPurchaseHandler}
        continuePurchase = {this.continuePurchaseHandler}
        price = {this.props.totalPrice}
      />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} cancelPurchase={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitIngredients: () => dispatch(initIngredients()),
    onAddIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) => dispatch(removeIngredient(ingredient)),
    onInitPurchase: () => dispatch(purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));