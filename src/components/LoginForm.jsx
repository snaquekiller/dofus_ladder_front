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
      password: ''
    };
    this.login = this.login.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleLogin(e) {
    this.setState({ email: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  login() {
    const { email, password } = this.state;
    const { login } = this.props;
    LoginService.login(email, password).then(() => {
      login();
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <PanelForm>
        <Panel>
          <Form>
            <FormGroup controlId="formBasicEmail">
              <ControlLabel>Login</ControlLabel>
              <FormControl
                type="email"
                placeholder="Email"
                onChange={this.handleLogin}
                value={email}
              />
              <FormControl
                type="password"
                placeholder="Password"
                onChange={this.handlePassword}
                value={password}
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button onClick={() => this.login()} type="button">
              Login
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
