import React from 'react';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { Contacts, BarChart, ExitToApp, Home } from '@material-ui/icons';

import { ConfigUriUtil } from '../config/index.jsx';
import { translate, text } from '../config/text.js';
import LoginStore from '../store/LoginStore.js';

const StyledMenu = styled.div`
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 10px;
    top: 36px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #373a47;
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #a90000;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: #373a47;
    padding: 0.3em 1em 0;
    font-size: 1.15em;
  }
  .bm-menu a {
    color: #b8b7ad;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
    width: 100%;
    text-align: left;
    vertical-align: middle;
  }

  .bm-item-list a {
    color: #b8b7ad;
    padding: 0.8em;
    width: 100%;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
    width: 100%;
  }

  .bm-text {
    margin-left: 10px;
    position: relative;
    bottom: 3px;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;
export default class MenuDofus extends React.Component {
  constructor(_props) {
    super(_props);
    this.state = {
      menuOpen: false
    };
    this._goToLink = this._goToLink.bind(this);
  }

  _goToLink() {
    console.log("false")
    this.setState({menuOpen: false})
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  

  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  render() {

    const isLoggedIn = LoginStore.refreshToken();

    let loginLogout = (
      <Link id="login" className="bm-item" to="/login" onClick={this._goToLink}>
        <ExitToApp fontSize="large" />
        <span className="bm-text">{translate(text.menu.login)}</span>
      </Link>
    );

    if (ConfigUriUtil.hasToken()) {
      loginLogout = (
        <Link id="logout" className="bm-item" to="/logout" onClick={this._goToLink}>
          <ExitToApp fontSize="large" />
          <span className="bm-text">{translate(text.menu.logout)}</span>
        </Link>
      );
    }
    const privateMenu = (
      <Link id="home" className="bm-item" to="/" onClick={this._goToLink}>
        <BarChart fontSize="large"/>
        <span className="bm-text">Comparaison</span>
      </Link>
    );

    return (
      <StyledMenu>
        <Menu className="bm-menu" outerContainerId={ "outer-container" } isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
          <Link id="home" className="bm-item" to="/" onClick={this._goToLink}>
            <Home fontSize="large"/>
            <span className="bm-text">Home</span>
          </Link>
          {isLoggedIn ? privateMenu : null}
          <Link id="contact" className="bm-item" to="/contact" onClick={this._goToLink}>
            <Contacts fontSize="large" />
            <span className="bm-text">Contact</span>
          </Link>
          {loginLogout}
        </Menu>
      </StyledMenu>
    );
  }
}
