import Card from "./Card.js";

export default class PersonalCard extends Card {
  constructor({ _id, name, link, likes}, templateSelector, handleCardClick, handleTrashClick) {
    super({ _id, name, link, likes}, templateSelector, handleCardClick);

    this._handleTrashClick = handleTrashClick;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._trashButton.addEventListener('click', () => this._handleTrashClick(this._card, this._id));
  }

  createCard() {
    this._fillTemplate();

    this._trashButton = this._card.querySelector('.cards__trash-button');

    this._updateLikeCounter();
    this._setEventListeners();

    return this._card;
  }
}