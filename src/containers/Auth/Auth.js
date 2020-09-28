import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { auth, setAuthRedirectPath } from '../../store/actions/index';
import { checkValidationHandler } from '../../shared/validation';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './Auth.module.css';

class Auth extends Component {
  
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          name: 'email',
          type: 'email',
          placeholder: 'E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorType: 'Email'
      },
      password: {
        elementType: 'input',
        elementConfig: {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        errorType: 'password'
      }
    },
    isSignUp: true 
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (e) => {
    const updatedControls = {
      ...this.state.controls,
      [e.target.name]: {
        ...this.state.controls[e.target.name],
        value: e.target.value,
        valid: checkValidationHandler(e.target.value, this.state.controls[e.target.name].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls});
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    });
  }

  render() {
    let formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElements.map(control => (
      <Input key={control.id} 
        elementType={control.config.elementType} 
        elementConfig={control.config.elementConfig} 
        value={control.config.value} 
        invalid={!control.config.valid}
        shouldValidate={control.config.validation}
        touched={control.config.touched}
        errorName={control.config.errorType}
        changed={this.inputChangeHandler}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    let message = null;

    if (this.props.error) {
      message = this.props.error.message.split('_').join(' ');
      errorMessage = <p className={classes.ErrorMessage}>{message}</p>
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return(
      <div className={classes.Auth}> 
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" >Submit</Button>
        </form>
        <Button 
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
        >
          Switch to {this.state.isSignUp? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);