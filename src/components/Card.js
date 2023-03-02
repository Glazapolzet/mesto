export  default class Card {

  constructor({ _id, name, link, likes, owner }, templateSelector, personalId, handleCardClick, handleTrashClick, updateLike) {
    this._cardId = _id;
    this._personalId = personalId;
    this._creatorId = owner['_id'];

    this._title = name;
    this._image = link;
    this._likes = likes;
    this._isLiked = false;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._updateLike = updateLike;

    this._fillTemplate();
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
  }

  _setLike() {
    this._updateLike(this._cardId, 'PUT', this._toggleLikeButton.bind(this))
  }

  _removeLike() {
    this._updateLike(this._cardId, 'DELETE', this._toggleLikeButton.bind(this))
  }

  _updateLikeCounter() {
    this._likeCounter.textContent = this._likes.length;
  }

  _toggleLikeIcon() {
    this._isLiked = !this._isLiked;
    this._likeButton.classList.toggle('cards__like-button_active');
  }

  _toggleLikeButton({ likes }) {
    this._likes = likes;

    this._toggleLikeIcon();
    this._updateLikeCounter();
  }

  _handleLikeButton() {
    if(this._isLiked) {
      this._removeLike();
    } else {
      this._setLike();
    }
  }

  _getLikedIds() {
    this._likedId = [];
    this._likes.forEach(likedUser => {
      this._likedId.push(likedUser['_id']);
    });
    return this._likedId;
  }

  _showImagePopup() {
    this._handleCardClick(this._title, this._image);
  }

  _hideTrashButton() {
    this._trashButton.classList.add('cards__trash-button_hidden');
    this._trashButton.disabled = true;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeButton());
    this._cardImage.addEventListener('click', () => this._showImagePopup());
    if (!this._trashButton.disabled){
      this._trashButton.addEventListener('click', () => {
        this._handleTrashClick(this._card, this._cardId)
      });
    }
  }

  _fillTemplate() {
    this._card = this._getTemplate();

    this._trashButton = this._card.querySelector('.cards__trash-button');

    this._cardImage = this._card.querySelector('.cards__image');
    this._cardTitle = this._card.querySelector('.cards__title');
    this._likeButton = this._card.querySelector('.cards__like-button');
    this._likeCounter = this._card.querySelector('.cards__like-counter');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
  }

  createCard() {
    if (this._creatorId !== this._personalId) {
      this._hideTrashButton();
    }

    this._setEventListeners();
    this._updateLikeCounter();

    if (this._getLikedIds().includes(this._personalId)) {
      this._toggleLikeIcon();
    }

    return this._card;
  }

}