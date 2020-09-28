import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

  cancelPurchaseHandler = () => {
    this.props.history.goBack();
  }

  continuePurchaseHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    let summary = <Redirect to='/' />
    if (this.props.ingredients) {
      let burgerPurchased = this.props.purchased ? <Redirect to='/' /> : null;
      summary = (
        <div>
          {burgerPurchased}
          <CheckoutSummary 
            ingredients = {this.props.ingredients} 
            cancelPurchase = {this.cancelPurchaseHandler}
            continuePurchase = {this.continuePurchaseHandler} 
          />
          <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
      );
    }
    return summary;
  }
}
 
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);