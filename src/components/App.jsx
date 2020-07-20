import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GraphCompare from './GraphCompare.jsx';
import { translate, text } from '../config/text.js';
import Menu from './Menu.jsx';
import LoginForm from './LoginForm.jsx';
import Logout from './Logout.jsx';
import Contact from './Contact.jsx';
import PrivateRoute from './route/PrivateRoute.jsx';

const PanelForm = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
@observer
class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }} id="outer-container">
        <Router>
          <Menu />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <PanelForm>
            <h1>{translate(text.welcome)}</h1>
              <Route path="/login" component={LoginForm} />
              <PrivateRoute path="/logout" component={Logout} />
              <PrivateRoute path="/GraphCompare" component={GraphCompare} />
              <PrivateRoute path="/contact" component={Contact} />
          </PanelForm>
        </Router>
      </div>
    );
  }
}
export default App;
