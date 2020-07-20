import React from 'react';
import styled from 'styled-components';

import { translate, text } from '../config/text.js';

const PanelForm = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;
// show https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
const Contact = function contact(props, context) {
  return (
    <PanelForm>
        Bonjour
    </PanelForm>
  );
};

export default Contact;
Contact.propTypes = {
};
