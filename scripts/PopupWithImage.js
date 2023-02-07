import Popup from "./Popup.js";

class PopupWithImage extends Popup {

  constructor (selector) {
    super (selector);
    this._picture = this._popupSelector.querySelector('.picture-modal__picture');
    this._pictureCaption = this._popupSelector.querySelector('.picture-modal__caption');
  }

  //TODO: нужно как то передать src и alt карточки в попап картинки
  open (link, name) {
    this._picture.src = link;
    this._picture.alt = name;
    this._pictureCaption.textContent = name;
    super.open();
  }

}