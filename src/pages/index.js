import './index.css';

import {config} from '../utils/constants.js';
import Card from '../components/Card.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

const page = document.querySelector('.page');

const profile = page.querySelector('.profile');

const placePopupForm = document.forms['addPlace'];
const profilePopupForm = document.forms['editProfile'];

const profileValidator = new FormValidator(config, profilePopupForm);
const placeValidator = new FormValidator(config, placePopupForm);

const userName = profile.querySelector('.profile__name');
const userDesc = profile.querySelector('.profile__desc');

const userInfo = new UserInfo(userName, userDesc);

const profileButton = profile.querySelector('.profile__edit-user-button');
const placeButton = profile.querySelector('.profile__add-place-button');

let cardList;

function handleCardClick (name, link) {
  imagePopup.open(name, link);
}

function createCard(data, templateSelector, handleCardClick) {
  const card = new Card(data, templateSelector, handleCardClick);
  return card.createCard();
}

fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
  headers: {
    authorization: 'c396fbd1-7576-4540-8bc4-2cee17b42d06'
  }
})
  .then(res => res.json())
  .then((data) => {
    cardList = new Section({
        items: data,
        renderer: (item) => {
          const card = createCard(item, '#card', handleCardClick);
          cardList.addItem(card);
        }
      },
      '.cards__list');
    cardList.renderItems();
  });

// const cardList = new Section({
//     items: initialCards,
//     renderer: (item) => {
//       const card = createCard(item, '#card', handleCardClick);
//       cardList.addItem(card);
//     }
//   },
//   '.cards__list');

const imagePopup = new PopupWithImage('.picture-modal');

const profilePopup = new PopupWithForm({
  selector: '.popup_use_edit-profile',
  handleFormSubmit: ({ name, desc }) => {
    userInfo.setUserInfo(name, desc);

    profilePopup.close();
  }
});

const placePopup = new PopupWithForm({
  selector: '.popup_use_add-place',
  handleFormSubmit: (data) => {

    const newCard = createCard(data, '#card', handleCardClick);
    cardList.addItem(newCard);

    placePopup.close();
  }
});

profileButton.addEventListener('click', () => {
  const infoObject = userInfo.getUserInfo();

  profilePopup.setInputValues(infoObject);

  profileValidator.resetValidation();

  profilePopup.open();
});

placeButton.addEventListener('click', () => {
  placeValidator.resetValidation();

  placePopup.open();
});

// cardList.renderItems();

profilePopup.setEventListeners();
placePopup.setEventListeners();
imagePopup.setEventListeners();

placeValidator.enableValidation();
profileValidator.enableValidation();