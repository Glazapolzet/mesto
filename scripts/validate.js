const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const showInputError = (form, formInput, errorMessage) => {
  const errorInput = form.querySelector(`.${formInput.id}-error`);
  errorInput.textContent = errorMessage;
  formInput.classList.add(config.inputErrorClass);
  errorInput.classList.add(config.errorClass);
}

const hideInputError = (form, formInput) => {
  const errorInput = form.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(config.inputErrorClass);
  errorInput.classList.remove(config.errorClass);
  errorInput.textContent = '';
}

const resetValidationErrors = (form) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(input => hideInputError(form, input));
}

const isValid = (form, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(form, formInput, formInput.validationMessage);
  } else {
    hideInputError(form, formInput);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(formInput => {
    return !formInput.validity.valid;
  })
}

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute("disabled", "");
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute("disabled", "");
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputList.forEach(formInput => {
    formInput.addEventListener('input', () => {
      isValid(form, formInput);
      toggleButtonState(inputList, button);
    });
  });

  form.addEventListener('reset', () => {
    toggleButtonState(inputList, button);
  })
}

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach(form => {
    setEventListeners(form);
  })
}

enableValidation(config);