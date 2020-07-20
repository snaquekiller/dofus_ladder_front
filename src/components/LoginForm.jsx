import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

import LoginService from '../service/LoginService.jsx';
import { translate, text } from '../config/text.js';


const PanelForm = styled.div`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  border-style: solid;
  padding: 40px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
  box-shadow: none;
`;
export default class LoginForm extends React.Component {
  constructor(_props) {
    super(_props);
    this.state = {
      email: '',
      password: '',
      error: null,
      isChecked: false
    };
    this._login = this._login.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
    this._handlePassword = this._handlePassword.bind(this);
  }

  _handleLogin(_e) {
    this.setState({ email: _e.target.value });
  }

  _handlePassword(_e) {
    this.setState({ password: _e.target.value });
  }

  _login() {
    const { email, password } = this.state;
    const { login } = this.props;
    LoginService.login(email, password).then(() => {
      if(login) {
        login();
      }
      // we don't need a refresh so we assign it like that
      this.state.error = null;
    }).catch(() => {
      this.setState({ error: translate(text.error.badCredential) });
    });
  }

  render() {
    const {
      email, password, error,
    } = this.state;
    return (
      <PanelForm>
        <Form validated="true">
          <FormGroup controlId="formBasicEmail">
            <FormLabel>Login</FormLabel>
            <FormControl
              type="email"
              placeholder={translate(text.login.email)}
              onChange={this._handleLogin}
              value={email}
              isValid={true}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="formPassword">
            <FormControl
              type="password"
              placeholder={translate(text.login.password)}
              onChange={this._handlePassword}
              value={password}
              isValid={true}
            />
            <FormControl.Feedback type="invalid">
              {error && error.username}
            </FormControl.Feedback>
          </FormGroup>
          {error || null}
          <Button onClick={() => this._login()} type="button">
            {translate(text.menu.login)}
          </Button>
        </Form>
      </PanelForm>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func
};
