import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import GraphCompare from './GraphCompare.jsx';
import { translate, text } from '../config/text.js';
import Menu from './Menu.jsx';
import LoginForm from './LoginForm.jsx';
import Logout from './Logout.jsx';
import LoginStore from '../store/LoginStore.js';

const PanelForm = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
@observer
class App extends React.Component {
  constructor(_props) {
    super(_props);
    this.updateCookie = this.updateCookie.bind(this);
  }

  updateCookie() {
    LoginStore.refreshToken();
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Menu />
        <PanelForm>
          <h1>{translate(text.welcome)}</h1>
          {!LoginStore.token ? (
            <LoginForm login={this.updateCookie} />
          ) : (
            <Router>
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/GraphCompare" component={GraphCompare} />
            </Router>
          )}
        </PanelForm>
      </div>
    );
  }
}
export default App;
