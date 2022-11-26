const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

class FormValidator {

  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._form = form;
  }

  _showInputError(formInput) {
    this._errorInput = this._form.querySelector(`.${formInput.id}-error`);
    this._errorInput.textContent = formInput.validationMessage;
    formInput.classList.add(this._inputErrorClass);
    this._errorInput.classList.add(this._errorClass);
  }

  _hideInputError(formInput) {
    this._errorInput = this._form.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorClass);
    this._errorInput.classList.remove(this._errorClass);
    this._errorInput.textContent = '';
  }

  _isValid(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some(formInput => {
      return !formInput.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute("disabled", "");
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute("disabled", "");
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();

    this._inputList.forEach(formInput => {
      formInput.addEventListener('input', () => {
        this._isValid(formInput);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

}

const hideInputError = (form, formInput) => {
  const errorInput = form.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(config.inputErrorClass);
  errorInput.classList.remove(config.errorClass);
  errorInput.textContent = '';
}

export {FormValidator, hideInputError, config};