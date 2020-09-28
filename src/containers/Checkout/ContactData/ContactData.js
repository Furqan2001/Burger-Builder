import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import { purchaseBurger } from '../../../store/actions/index';
import { checkValidationHandler } from '../../../shared/validation';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          name: 'name',
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorType: 'name'
      },
      street: {
        elementType: 'input',
        elementConfig: {
          name: 'street',
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorType: 'street'
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          name: 'zipCode',
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        errorType: 'zip code'
      },
      country: {
        elementType: 'input',
        elementConfig: {
          name: 'country',
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorType: 'country'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          name: 'email',
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorType: 'email'
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          name: 'deliveryMethod',
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    let orderData = {};
    for (let formElement in this.state.orderForm) {
      orderData[formElement] = this.state.orderForm[formElement].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData,
      userId: this.props.userId
    }
    this.props.onBurgerPurchase(order, this.props.token);     
  }

  inputChangeHandler = (e) => {
    let orderForm = {...this.state.orderForm};
    let orderFormElement = {...this.state.orderForm[e.target.name]};
    orderFormElement.value = e.target.value;
    orderFormElement.valid = checkValidationHandler(orderFormElement.value, orderFormElement.validation);
    orderFormElement.touched = true;
    orderForm[e.target.name] = orderFormElement;
    let formIsValid = true;
    for (let inputElement in orderForm) {
      formIsValid = orderForm[inputElement].valid && formIsValid;
    }
    this.setState({ orderForm, formIsValid });
  }

  render() {
    let formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(order => (
          <Input key={order.id} 
            elementType={order.config.elementType} 
            elementConfig={order.config.elementConfig} 
            value={order.config.value} 
            invalid={!order.config.valid}
            shouldValidate={order.config.validation}
            touched={order.config.touched}
            errorName={order.config.errorType}
            changed={this.inputChangeHandler}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBurgerPurchase: (orderData, token) => dispatch(purchaseBurger(orderData, token)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios ));
