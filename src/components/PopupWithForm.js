import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor ({ selector, handleFormSubmit }) {
    super(selector);

    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__save-button');
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues () {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setLoadingButtonText(text) {
    this._submitButton.textContent = text;
  }

  setDefaultButtonText() {
    this._submitButton.textContent = this._submitButtonText;
  }

  close () {
    super.close();

    this._form.reset();
  }

}