import initialCards from './cards.js';
import Card from './Card.js';
import {FormValidator, hideInputError, config} from './FormValidator.js';

const page = document.querySelector('.page');

const popupList = Array.from(page.querySelectorAll('.popup'));

const cardsList = page.querySelector('.cards__list');

const profile = page.querySelector('.profile');

const popupEditProfile = page.querySelector('.popup_use_edit-profile');
const popupAddPlace = page.querySelector('.popup_use_add-place');

const buttonEditUser = profile.querySelector('.profile__edit-user-button');
const buttonAddPlace = profile.querySelector('.profile__add-place-button');

const userName = profile.querySelector('.profile__name');
const userJob = profile.querySelector('.profile__job');

const formList = document.querySelectorAll('.popup__form');

const popupFormEditProfile = popupEditProfile.querySelector('.popup__form');
const inputUserName = popupEditProfile.querySelector('.popup__input_content_user-name');
const inputUserJob = popupEditProfile.querySelector('.popup__input_content_user-job');

const popupFormAddPlace = popupAddPlace.querySelector('.popup__form');
const inputPlaceTitle = popupAddPlace.querySelector('.popup__input_content_place-title');
const inputPlaceLink = popupAddPlace.querySelector('.popup__input_content_place-link');


function showPopup (popupName) {
  document.addEventListener('keydown', closeByEsc);
  popupName.classList.add('popup_opened');
}

function closePopup (popupName) {
  document.removeEventListener('keydown', closeByEsc);
  popupName.classList.remove('popup_opened');
  if (!popupName.classList.contains('picture-modal')) {
    const inputList = Array.from(popupName.querySelectorAll('.popup__input'));
    inputList.forEach(input => hideInputError(popupName, input));
  }
}

function closeButtonsAddHandler () {
  const buttonsClose = page.querySelectorAll('.popup__close-button');
  buttonsClose.forEach(buttonClose =>
    buttonClose.addEventListener('click', () => closePopup(buttonClose.closest('.popup'))));
}

function editProfileFormSubmitHandler (evt) {
  evt.preventDefault();

  userName.textContent = inputUserName.value;
  userJob.textContent = inputUserJob.value;

  closePopup(popupEditProfile);
}

function addPlaceFormSubmitHandler (evt) {
  evt.preventDefault();

  const newPlace = {};
  newPlace.name = inputPlaceTitle.value;
  newPlace.link = inputPlaceLink.value;

  const card = new Card(newPlace, '#card', showPopup);
  cardsList.prepend(card.createCard());

  closePopup(popupAddPlace);

  popupFormAddPlace.reset();
}

const closeByOverlayClick = (evt) => {
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

const closeByEsc = (evt) => {
  if(evt.key === 'Escape') {
    closePopup(page.querySelector('.popup_opened'));
  }
}

initialCards.forEach(item => {
  const card = new Card(item, '#card', showPopup);
  cardsList.append(card.createCard());
});

popupList.forEach(popup => popup.addEventListener('click', closeByOverlayClick));

popupFormEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
popupFormAddPlace.addEventListener('submit', addPlaceFormSubmitHandler);

buttonEditUser.addEventListener('click', () => {
  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;

  showPopup(popupEditProfile);
});

buttonAddPlace.addEventListener('click', () => {
  popupFormAddPlace.reset();
  showPopup(popupAddPlace);
});

formList.forEach(item => {
  const form = new FormValidator(config, item);
  form.enableValidation();
})

closeButtonsAddHandler();