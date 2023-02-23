export  default class Card {

  constructor({ _id, name, link, likes}, templateSelector, handleCardClick) {
    this._id = _id;

    this._title = name;
    this._image = link;
    this._likes = likes;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
  }

  _setLike() {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${this._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: 'c396fbd1-7576-4540-8bc4-2cee17b42d06'
      }
    })
      .then(res => res.json())
      .then(data => {
        this._toggleLikeButton(data);
      })
      .catch(err => console.log(err))
  }

  _removeLike() {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${this._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: 'c396fbd1-7576-4540-8bc4-2cee17b42d06'
      }
    })
      .then(res => res.json())
      .then(data => {
        this._toggleLikeButton(data);
      })
      .catch(err => console.log(err))
  }

  _updateLikeCounter() {
    this._likeCounter.textContent = this._likes.length;
  }

  _toggleLikeButton({ likes }) {
    this._isLiked = !this._isLiked;

    this._likes = likes;
    this._likeButton.classList.toggle('cards__like-button_active');

    this._updateLikeCounter();
  }

  _handleLikeButton() {
    if(this._isLiked) {
      this._removeLike();
    } else {
      this._setLike();
    }
  }

  _showImagePopup() {
    this._handleCardClick(this._title, this._image);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeButton());
    this._cardImage.addEventListener('click', () => this._showImagePopup());
  }

  _fillTemplate() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector('.cards__image');
    this._cardTitle = this._card.querySelector('.cards__title');
    this._likeButton = this._card.querySelector('.cards__like-button');
    this._likeCounter = this._card.querySelector('.cards__like-counter');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
  }

  createCard() {
    this._fillTemplate();
    this._updateLikeCounter();
    this._setEventListeners();

    return this._card;
  }

}