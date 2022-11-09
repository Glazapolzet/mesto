const page = document.querySelector('.page');
const cardTemplate = document.querySelector('#card').content;
const popupList = Array.from(page.querySelectorAll('.popup'));

const cardsList = page.querySelector('.cards__list');
const profile = page.querySelector('.profile');
const pictureModal = page.querySelector('.picture-modal');

const popupEditProfile = page.querySelector('.popup_use_edit-profile');
const popupAddPlace = page.querySelector('.popup_use_add-place');

const buttonEditUser = profile.querySelector('.profile__edit-user-button');
const buttonAddPlace = profile.querySelector('.profile__add-place-button');

const userName = profile.querySelector('.profile__name');
const userJob = profile.querySelector('.profile__job');

const popupFormEditProfile = popupEditProfile.querySelector('.popup__form');
const inputUserName = popupEditProfile.querySelector('.popup__input_content_user-name');
const inputUserJob = popupEditProfile.querySelector('.popup__input_content_user-job');
const buttonSaveUser = popupEditProfile.querySelector('.popup__save-button');

const popupFormAddPlace = popupAddPlace.querySelector('.popup__form');
const inputPlaceTitle = popupAddPlace.querySelector('.popup__input_content_place-title');
const inputPlaceLink = popupAddPlace.querySelector('.popup__input_content_place-link');

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

  cardsList.prepend(createCard(newPlace));

  closePopup(popupAddPlace);

  popupFormAddPlace.reset();
}

function createCard (item) {
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);

  const cardImage = card.querySelector('.cards__image');
  const cardTitle = card.querySelector('.cards__title');
  const likeButton = card.querySelector('.cards__like-button');
  const trashButton = card.querySelector('.cards__trash-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  likeButton.addEventListener('click', evt => evt.target.classList.toggle('cards__like-button_active'));
  trashButton.addEventListener('click', evt => evt.target.parentElement.remove());
  cardImage.addEventListener('click', () => {
    picture.src = cardImage.src;
    picture.alt = cardImage.alt;
    pictureCaption.textContent = cardTitle.textContent;

    showPopup(pictureModal);
  })

  return card;
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

initialCards.forEach(item => cardsList.append(createCard(item)));

popupList.forEach(popup => popup.addEventListener('click', closeByOverlayClick));

popupFormEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
popupFormAddPlace.addEventListener('submit', addPlaceFormSubmitHandler);

buttonEditUser.addEventListener('click', () => {
  resetValidationErrors(popupFormEditProfile);
  
  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;

  buttonSaveUser.classList.remove('popup__save-button_disabled');
  buttonSaveUser.removeAttribute("disabled");

  showPopup(popupEditProfile);
});

buttonAddPlace.addEventListener('click', () => {
  resetValidationErrors(popupFormAddPlace);
  popupFormAddPlace.reset();
  showPopup(popupAddPlace);
});

closeButtonsAddHandler();

