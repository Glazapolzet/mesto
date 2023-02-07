import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import {config} from "./constants.js";

class PopupWithForm extends Popup {

  constructor (selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;

    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._formValidator = new FormValidator(config, this._popupForm);
  }

  _getInputValues () {
    return Array.from(this._popupSelector.querySelectorAll('.popup__input'));
  }

  setEventListeners (evt) {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._handleFormSubmit);
  }

  close () {
    super.close();
    this._formValidator.resetValidation();
  }

}