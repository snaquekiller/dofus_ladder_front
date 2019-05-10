import React from 'react';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';

import { ConfigUriUtil } from '../config/index.jsx';

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
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;
export default class MenuDofus extends React.Component {
  constructor(props) {
    super(props);
  }

  coucou() {
    return '';
  }

  render() {
    let loginLogout = (
      <a id="login" className="menu-item" href="/login">
        Login
      </a>
    );

    if (ConfigUriUtil.hasToken()) {
      loginLogout = (
        <a id="logout" className="menu-item" href="/logout">
          Logout
        </a>
      );
    }
    return (
      <StyledMenu>
        <Menu>
          <a id="home" className="menu-item" href="/">
            Comparaison
          </a>
          <a id="about" className="menu-item" href="/about">
            Top
          </a>
          <a id="contact" className="menu-item" href="/contact">
            Contact
          </a>
          {loginLogout}

        </Menu>
      </StyledMenu>
    );
  }
}
