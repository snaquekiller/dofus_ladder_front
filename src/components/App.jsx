import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import GraphCompare from './GraphCompare.jsx';
import Menu from './Menu.jsx';
import LoginForm from './LoginForm.jsx';
import LoginStore from '../store/LoginStore.js';

const PanelForm = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
@observer
class App extends React.Component {
  constructor(props) {
    super(props);
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
          <h1>Welcome to Dofus Ladder</h1>
          {!LoginStore.token ? (
            <LoginForm login={this.updateCookie} />
          ) : (
            <GraphCompare />
          )}
        </PanelForm>
      </div>
    );
  }
}
export default App;
