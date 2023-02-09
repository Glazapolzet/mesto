import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor (selector) {
    super (selector);
    this._picture = this._popup.querySelector('.picture-modal__picture');
    this._pictureCaption = this._popup.querySelector('.picture-modal__caption');
  }

  open (name, link) {
    this._picture.src = link;
    this._picture.alt = name;
    this._pictureCaption.textContent = name;
    super.open();
  }

}