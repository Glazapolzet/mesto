import {initialCards, config} from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const popupFormEditProfile = popupEditProfile.querySelector('.popup__form');
const inputUserName = popupEditProfile.querySelector('.popup__input_content_user-name');
const inputUserJob = popupEditProfile.querySelector('.popup__input_content_user-job');

const popupFormAddPlace = popupAddPlace.querySelector('.popup__form');
const inputPlaceTitle = popupAddPlace.querySelector('.popup__input_content_place-title');
const inputPlaceLink = popupAddPlace.querySelector('.popup__input_content_place-link');

const editProfileValidator = new FormValidator(config, popupFormEditProfile);
const addPlaceValidator = new FormValidator(config, popupFormAddPlace);

const pictureModal = page.querySelector('.picture-modal');
const picture = pictureModal.querySelector('.picture-modal__picture');
const pictureCaption = pictureModal.querySelector('.picture-modal__caption');


function showPopup (popupName) {
  document.addEventListener('keydown', closeByEsc);
  popupName.classList.add('popup_opened');
}

function closePopup (popupName) {
  document.removeEventListener('keydown', closeByEsc);
  popupName.classList.remove('popup_opened');
}

function handleOpenPopup (name, link) {
  picture.src = link;
  picture.alt = name;
  pictureCaption.textContent = name;

  showPopup(pictureModal);
}

function createCard(data, templateSelector, handleOpenPopup) {
  const card = new Card(data, templateSelector, handleOpenPopup);
  return card.createCard();
}

function addCloseButtonsHandlers () {
  const buttonsClose = page.querySelectorAll('.popup__close-button');
  buttonsClose.forEach(buttonClose => buttonClose.addEventListener('click', () => closePopup(buttonClose.closest('.popup'))));
}

function editProfileFormSubmitHandler (evt) {
  evt.preventDefault();

  userName.textContent = inputUserName.value;
  userJob.textContent = inputUserJob.value;

  closePopup(popupEditProfile);
}

function addPlaceFormSubmitHandler (evt) {
  evt.preventDefault();

  const newPlace = {
    name: inputPlaceTitle.value,
    link: inputPlaceLink.value,
  };

  const card = createCard(newPlace, '#card', handleOpenPopup);
  cardsList.prepend(card);

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
  const card = createCard(item, '#card', handleOpenPopup);
  cardsList.append(card);
});

popupList.forEach(popup => popup.addEventListener('click', closeByOverlayClick));

popupFormEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
popupFormAddPlace.addEventListener('submit', addPlaceFormSubmitHandler);

buttonEditUser.addEventListener('click', () => {
  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;

  editProfileValidator.resetValidation();
  showPopup(popupEditProfile);
});

buttonAddPlace.addEventListener('click', () => {
  popupFormAddPlace.reset();
  addPlaceValidator.resetValidation();
  showPopup(popupAddPlace);
});

editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();

addCloseButtonsHandlers();