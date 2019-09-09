import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Panel from 'react-bootstrap/lib/Panel';

import {
  Icon
} from '@material-ui/core';
import LoginService from '../service/LoginService.jsx';
import { translate, text } from '../config/text.js';


const PanelForm = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
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
    this.checkBox = this.checkBox.bind(this);
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
      login();
      // we don't need a refresh so we assign it like that
      this.state.error = null;
    }).catch(() => {
      this.setState({ error: translate(text.error.badCredential) });
    });
  }

  checkBox() {
    console.log('ddd');
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    const {
 email, password, error, isChecked 
} = this.state;
    const couleur = '#4CAF50';
    console.log('cou', isChecked);
    return (
      <PanelForm>
        <Panel>
          <Form validated>
            <FormGroup controlId="formBasicEmail">
              <ControlLabel>Login</ControlLabel>
              <FormControl
                type="email"
                placeholder={translate(text.login.email)}
                onChange={this.handleLogin}
                value={email}
                isValid="valid"
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormControl
                type="password"
                placeholder={translate(text.login.password)}
                onChange={this.handlePassword}
                value={password}
              />
              <FormControl.Feedback />
            </FormGroup>
            {error || null}
            <Button onClick={() => this._login()} type="button">
              {translate(text.menu.login)}
            </Button>
          </Form>
          <div
            onClick={this.checkBox}
            style={{
              '--color': couleur,
              '--hover-bg-color': isChecked ? couleur : '#FFFFFF',
              width: 15,
              height: 15,
              borderStyle: 'solid',
              borderColor: 'var(--color)',
              backgroundColor: 'var(--color)',
              color: 'var(--color)',
              '&:hover': {
                backgroundColor: 'var(--hover-bg-color)'
              }
            }}
          >
            {
            isChecked
            && <Icon className="fa fa-check" style={{ color: '#000000' }} />
          }
          </div>
        </Panel>
      </PanelForm>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};
