import './index.css';

import {config} from '../utils/constants.js';
import Api from "../components/Api.js";
import Card from '../components/Card.js';
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
const userInfo = new UserInfo(userName, userDesc);

const avatarPopupForm = document.forms['editAvatar'];
const placePopupForm = document.forms['addPlace'];
const profilePopupForm = document.forms['editProfile'];

const avatarValidator = new FormValidator(config, avatarPopupForm);
const profileValidator = new FormValidator(config, profilePopupForm);
const placeValidator = new FormValidator(config, placePopupForm);

const avatarButton = profile.querySelector('.profile__avatar-wrapper');
const profileButton = profile.querySelector('.profile__edit-user-button');
const placeButton = profile.querySelector('.profile__add-place-button');

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

function updateLike(cardId, method, handler) {
  api.updateLike(cardId, method)
    .then(data => handler(data))
    .catch(err => console.log(err))
}

function createCard(data, personalId) {
  const card = new Card(
    data,
    '#card',
    personalId,
    handleCardClick,
    handleTrashClick,
    updateLike
  );

  return card.createCard()
}

function postCard(name, link) {
  api.postCard(name, link)
    .then((data) => {
      const newCard = createCard(data, userInfo.getPersonalId());
      cardList.prependItem(newCard);

      placePopup.close();
    })
    .catch(err => console.log(err));
}

function editAvatar(link) {
  api.editAvatar(link)
    .then(({ avatar }) => {
      userAvatar.src = avatar;

      avatarPopup.close();
    })
    .catch((err) => console.log(err));
}

function editProfile(name, about) {
  api.editProfile(name, about)
    .then((data) => {
      userInfo.setUserInfo(data);

      profilePopup.close();
    })
    .catch((err) => console.log(err));
}

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userAvatar.src = userData['avatar'];
    userInfo.setUserInfo(userData);

    cardList = new Section({
        items: initialCards,
        renderer: (item) => {
          const card = createCard(item, userInfo.getPersonalId());

          if (item['owner']['_id'] === userInfo.getPersonalId()) {
            cardList.prependItem(card);
          } else {
            cardList.appendItem(card);
          }
        }
      },
      '.cards__list');

    cardList.renderItems()
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

  profilePopup.setInputValues(userInfo.getUserInfo());
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