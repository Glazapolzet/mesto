import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor (selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues () {
    return Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  setEventListeners () {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._handleFormSubmit);
  }

  close () {
    super.close();
  }

}