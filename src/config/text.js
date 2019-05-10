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
  valider: {
    fr: 'Valider',
    eng: ''
  }
};

function format(string, arg) {
  let a = string;

  if (arg && Array.isArray(arg)) {
    arg.forEach((element, i) => {
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
    return format(_text.fr, arg);
  }
  return '';
}
exports.translate = translate;
exports.text = text;
