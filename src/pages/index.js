import './index.css';

import {config} from '../utils/constants.js';
import Api from "../components/Api.js";
import Card from '../components/Card.js';
import PersonalCard from "../components/PersonalCard.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

const page = document.querySelector('.page');

const profile = page.querySelector('.profile');

const userAvatar = profile.querySelector('.profile__avatar');
const userName = profile.querySelector('.profile__name');
const userDesc = profile.querySelector('.profile__desc');

const avatarPopupForm = document.forms['editAvatar'];
const placePopupForm = document.forms['addPlace'];
const profilePopupForm = document.forms['editProfile'];

const avatarValidator = new FormValidator(config, avatarPopupForm);
const profileValidator = new FormValidator(config, profilePopupForm);
const placeValidator = new FormValidator(config, placePopupForm);

const avatarButton = profile.querySelector('.profile__avatar-wrapper');
const profileButton = profile.querySelector('.profile__edit-user-button');
const placeButton = profile.querySelector('.profile__add-place-button');

let userInfo;
let cardList;
let handleButtonClick;

const api = new Api({
  baseURL: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'c396fbd1-7576-4540-8bc4-2cee17b42d06',
    'Content-Type': 'application/json'
  }
})

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function handleTrashClick(card, cardId) {
  handleButtonClick = () => {
    api.deleteCard(cardId)
      .then(() => {
        card.remove();
        trashPopup.close();
      })
      .catch(err => console.log(err))
  }
  trashPopup.open();
}

function createCard(data, personalId) {
  const card = data['owner']['_id'] === personalId
  ? new PersonalCard(data, '#personal-card', handleCardClick, handleTrashClick)
  : new Card(data, '#card', handleCardClick);
  return card.createCard();
}

function postCard(name, link) {
  api.postCard(name, link)
    .then((data) => {
      const newCard = createCard(data, userInfo.getPersonalId(), handleCardClick);
      cardList.addItem(newCard);

      placePopup.close();
    })
    .catch(err => console.log(err));
}

function editAvatar(link) {
  api.editAvatar(link)
    .then(() => {
      userAvatar.src = link;

      avatarPopup.close();
    })
    .catch((err) => console.log(err));
}

function editProfile(name, about) {
  api.editProfile(name, about)
    .then(() => {
      userInfo.setUserInfo(name, about);

      profilePopup.close();
    })
    .catch((err) => console.log(err));
}

api.getUserData()
  .then(({ avatar, name, about, _id }) => {
    userAvatar.src = avatar;
    userName.textContent = name;
    userDesc.textContent = about;
    userInfo = new UserInfo(userName, userDesc, _id);
  })

api.getInitialCards()
  .then(data => {
    cardList = new Section({
        items: data,
        renderer: (item) => {
          const card = createCard(item, userInfo.getPersonalId(), handleCardClick);
          cardList.addItem(card);
        }
      },
      '.cards__list');
    cardList.renderItems();
  })
  .catch((err) => console.log(err));

const imagePopup = new PopupWithImage('.picture-modal');

const avatarPopup = new PopupWithForm({
  selector: '.popup_use_edit-avatar',
  handleFormSubmit: ({ link }) => {
    avatarPopup.setLoadingButtonText('Сохранение...');
    editAvatar(link);
  }
})

const profilePopup = new PopupWithForm({
  selector: '.popup_use_edit-profile',
  handleFormSubmit: ({ name, desc }) => {
    profilePopup.setLoadingButtonText('Сохранение...');
    editProfile(name, desc);
  }
});

const placePopup = new PopupWithForm({
  selector: '.popup_use_add-place',
  handleFormSubmit: ({ name, link }) => {
    placePopup.setLoadingButtonText('Сохранение...');
    postCard(name, link);
  }
});

const trashPopup = new PopupWithConfirmation({
  selector: '.popup_use_delete-card',
  handleButtonClick: () => handleButtonClick()
});

avatarButton.addEventListener('click', () => {
  avatarPopup.setDefaultButtonText();
  avatarValidator.resetValidation();

  avatarPopup.open();
})

profileButton.addEventListener('click', () => {
  profilePopup.setDefaultButtonText();
  const infoObject = userInfo.getUserInfo();

  profilePopup.setInputValues(infoObject);
  profileValidator.resetValidation();

  profilePopup.open();
});

placeButton.addEventListener('click', () => {
  placePopup.setDefaultButtonText();
  placeValidator.resetValidation();

  placePopup.open();
});

trashPopup.setEventListeners();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
placePopup.setEventListeners();
imagePopup.setEventListeners();

avatarValidator.enableValidation();
placeValidator.enableValidation();
profileValidator.enableValidation();