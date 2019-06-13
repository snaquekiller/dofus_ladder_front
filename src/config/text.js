
import { langage } from './index.jsx';
/* eslint-disable linebreak-style */
/**
 *  Pour avoir des texts avec des arguments vous pouvez faire:
 *     example: {
        fr: "Ceci est un {0} dont la facons dont on {1} la fonctionalité",
        eng: "This is an example for how we use it"
    },


    import {text, translate} from "../config/text";
    translate(text.example, "example", "utilise")
 */
const text = {
  annuler: {
    fr: 'Annuler',
    eng: ''
  },
  welcome:
  {
    fr: 'Bienvenue sur Dofus Ladder',
    eng: 'Welcome to Dofus Ladder'
  },
  redirect: {
    fr: 'Vous allez etre rediriger dans quelque seconde.',
    eng: 'You will be redirected in X sec.'
  },
  valider: {
    fr: 'Valider',
    eng: ''
  },
  menu: {
    login: {
      fr: 'Connexion',
      eng: 'Login'
    },
    logout: {
      fr: 'Logout',
      eng: 'Logout'
    }
  },
  login: {
    email: {
      fr: 'Email',
      eng: 'Email'
    },
    password: {
      fr: 'Mot de passe',
      eng: 'Password'
    }
  },
  error: {
    badCredential: {
      fr: 'Mot de passe ou email invalide.',
      eng: 'Wrong password or email.'
    }
  }
};

function format(_string, _arg) {
  let a = _string;

  if (_arg && Array.isArray(_arg)) {
    _arg.forEach((element, i) => {
      a = a.replace(new RegExp(`\\{${i}\\}`, 'g'), element);
    });
  }
  return a;
}

/*
Function for translate some text
*/
function translate(_text, ...arg) {
  if (_text && _text.fr) {
    return format(_text[langage], arg);
  }
  return '';
}
exports.translate = translate;
exports.text = text;
