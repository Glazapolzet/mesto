class Card {

  constructor(data, templateSelector, handleOpenPopup) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('cards__like-button_active');
  }

  _handleTrashButton() {
    this._card.remove();
  }

  _showImagePopup() {
    this._handleOpenPopup(this._title, this._image);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeButton());
    this._trashButton.addEventListener('click', () => this._handleTrashButton());
    this._cardImage.addEventListener('click', () => this._showImagePopup());
  }

  createCard() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector('.cards__image');
    this._cardTitle = this._card.querySelector('.cards__title');
    this._likeButton = this._card.querySelector('.cards__like-button');
    this._trashButton = this._card.querySelector('.cards__trash-button');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    this._setEventListeners();

    return this._card;
  }

}

export default Card;