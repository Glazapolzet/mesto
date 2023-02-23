import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {

  constructor ({ selector, handleButtonClick }) {
    super(selector);

    this._handleButtonClick = handleButtonClick;
    this._submitButton = this._popup.querySelector('.popup__save-button');
  }

  setEventListeners () {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._handleButtonClick();
    })
  }

}