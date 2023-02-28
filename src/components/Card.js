export  default class Card {

  constructor({ _id, name, link, likes}, templateSelector, handleCardClick, updateLike) {
    this._id = _id;

    this._title = name;
    this._image = link;
    this._likes = likes;
    this._isLiked = false;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._updateLike = updateLike;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
  }

  _setLike() {
    this._updateLike(this._id, 'PUT', this._toggleLikeButton.bind(this))
  }

  _removeLike() {
    this._updateLike(this._id, 'DELETE', this._toggleLikeButton.bind(this))
  }

  _updateLikeCounter() {
    this._likeCounter.textContent = this._likes.length;
  }

  toggleLikeIcon() {
    this._isLiked = !this._isLiked;
    this._likeButton.classList.toggle('cards__like-button_active');
  }

  getLikedId() {
    this._likedId = [];
    this._likes.forEach(likedUser => {
      this._likedId.push(likedUser._id);
    });
    return this._likedId;
  }

  _toggleLikeButton({ likes }) {
    this._likes = likes;

    this.toggleLikeIcon();
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