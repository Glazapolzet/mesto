export default class Popup {

  constructor (selector) {
    this._popupSelector = selector;

    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close(this._popupSelector);
    }
  }

  open () {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupSelector.classList.add('popup_opened');
  }

  close () {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.classList.remove('popup_opened');
  }

  setEventListeners () {
    this._closeButton.addEventListener('click', () => this.close(this._popupSelector));
    this._popupSelector.addEventListener('click', () => {
      if(this._popupSelector.contains('popup_opened')) {
        this.close(this._popupSelector);
      }
    });
  }
}