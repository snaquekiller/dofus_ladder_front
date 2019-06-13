import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Panel from 'react-bootstrap/lib/Panel';

import LoginService from '../service/LoginService.jsx';
import { translate, text } from '../config/text.js';

const PanelForm = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    };
    this.login = this.login.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleLogin(_e) {
    this.setState({ email: _e.target.value });
  }

  handlePassword(_e) {
    this.setState({ password: _e.target.value });
  }

  login() {
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

  render() {
    const { email, password, error } = this.state;
    
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
            <Button onClick={() => this.login()} type="button">
              {translate(text.menu.login)}
            </Button>
          </Form>
        </Panel>
      </PanelForm>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};
