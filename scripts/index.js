import {initialCards, config} from './constants.js';
import Card from './Card.js';
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";

const page = document.querySelector('.page');

const profile = page.querySelector('.profile');

const profilePopup = new PopupWithForm('.popup_use_edit-profile', handleProfileFormSubmit);
const placePopup = new PopupWithForm('.popup_use_add-place', handlePlaceFormSubmit);
const imagePopup = new PopupWithImage('.picture-modal');

const placePopupForm = document.forms['addPlace'];
const profilePopupForm = document.forms['editProfile'];

const profileValidator = new FormValidator(config, profilePopupForm);
const placeValidator = new FormValidator(config, placePopupForm);

const userName = profile.querySelector('.profile__name');
const userDesc = profile.querySelector('.profile__job');

const inputUserName = profilePopupForm.querySelector('.popup__input_content_user-name');
const inputUserDesc = profilePopupForm.querySelector('.popup__input_content_user-job');
const inputPlaceTitle = placePopupForm.querySelector('.popup__input_content_place-title');
const inputPlaceLink = placePopupForm.querySelector('.popup__input_content_place-link');

const userInfo = new UserInfo(userName.textContent, userDesc.textContent);

const profileButton = profile.querySelector('.profile__edit-user-button');
const placeButton = profile.querySelector('.profile__add-place-button');

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item, '#card', handleCardClick);
    cardList.addItem(card);
  }
},
  '.cards__list')

function handleCardClick (name, link) {
  imagePopup.open(name, link);
}

function createCard(data, templateSelector, handleCardClick) {
  const card = new Card(data, templateSelector, handleCardClick);
  return card.createCard();
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  userInfo.setUserInfo(inputUserName.value, inputUserDesc.value);

  userName.textContent = userInfo.getUserInfo().name;
  userDesc.textContent = userInfo.getUserInfo().desc;

  profilePopup.close();
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();

  const newPlace = {
    name: inputPlaceTitle.value,
    link: inputPlaceLink.value,
  }

  const newCard = createCard(newPlace, '#card', handleCardClick);
  cardList.addItem(newCard);

  placePopup.close();
  placePopupForm.reset();
}

profileButton.addEventListener('click', () => {
  inputUserName.value = userInfo.getUserInfo().name;
  inputUserDesc.value = userInfo.getUserInfo().desc;

  profileValidator.resetValidation();

  profilePopup.open();
});

placeButton.addEventListener('click', () => {
  placePopupForm.reset();
  placeValidator.resetValidation();

  placePopup.open();
});

cardList.renderItems();

profilePopup.setEventListeners();
placePopup.setEventListeners();
imagePopup.setEventListeners();

placeValidator.enableValidation();
profileValidator.enableValidation();