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
    title: 'аниме кот',
    link: animeCat
  },
  {
    title: 'кот бакалавр',
    link: bachelorCat
  },
  {
    title: 'кот просит два рубля',
    link: twoRoubleCat
  },
  {
    title: 'кот-аэродоставка',
    link: fungusCat
  },
  {
    title: 'любопытный кот',
    link: curiousCat
  },
  {
    title: 'образованный кот',
    link: studyCat
  }
];

export {initialCards, config};