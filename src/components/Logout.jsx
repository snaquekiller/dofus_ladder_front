import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Card } from 'react-bootstrap';
import { Route, Redirect } from 'react-router';

import LoginService from '../service/LoginService.jsx';
import { translate, text } from '../config/text.js';

const PanelForm = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;
class Logout extends React.Component {
  constructor(_props) {
    super(_props);
    this.state = {
      timer: 10
    };
  }

  render() {
    if (this.state.timer === 10) {
      setTimeout(() => {
        this.setState({ timer: 0 });
      }, 3000);
    }
    LoginService.logout();
    return (
      <PanelForm>
        <Card>
          <Form>
            {translate(text.redirect)}
            { this.state.timer === 0 ? (
              <Route>
                <Redirect
                  to={{
                    pathname: '/login',
                  }}
                />
              </Route>
            ) : null
            }
          </Form>
        </Card>
      </PanelForm>
    );
  }
}

export default Logout;
Logout.propTypes = {
};
