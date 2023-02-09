import animeCat from '../images/B6dk8V3DOr0.jpg';
import bachelorCat from '../images/BLAnwWsB1UA.jpg';
import twoRoubleCat from '../images/ErFa12zdw7Q.jpg';
import fungusCat from '../images/IslWZhM2OEo.jpg';
import curiousCat from '../images/XpiHdacNT2A.jpg';
import studyCat from '../images/ZfqZzvKVIPE.jpg';


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const initialCards = [
  {
    name: 'аниме кот',
    link: animeCat
  },
  {
    name: 'кот бакалавр',
    link: bachelorCat
  },
  {
    name: 'кот просит два рубля',
    link: twoRoubleCat
  },
  {
    name: 'кот-аэродоставка',
    link: fungusCat
  },
  {
    name: 'любопытный кот',
    link: curiousCat
  },
  {
    name: 'образованный кот',
    link: studyCat
  }
];

export {initialCards, config};