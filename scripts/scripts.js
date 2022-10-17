const page = document.querySelector('.page');
const cardTemplate = document.querySelector('#card').content;

const cardsList = page.querySelector('.cards__list');
const profile = page.querySelector('.profile');
const editProfilePopup = page.querySelector('.popup_use_edit-profile');
const addPlacePopup = page.querySelector('.popup_use_add-place');

const editUserButton = profile.querySelector('.profile__edit-user-button');
const addPlaceButton = profile.querySelector('.profile__add-place-button');
const userName = profile.querySelector('.profile__name');
const userJob = profile.querySelector('.profile__job');

const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');
const editProfilePopupForm = editProfilePopup.querySelector('.popup__form');
const inputUserName = editProfilePopup.querySelectorAll('.popup__input')[0];
const inputUserJob = editProfilePopup.querySelectorAll('.popup__input')[1];

const addPlacePopupCloseButton = addPlacePopup.querySelector('.popup__close-button');
const addPlacePopupForm = addPlacePopup.querySelector('.popup__form');
const inputPlaceTitle = addPlacePopup.querySelectorAll('.popup__input')[0];
const inputPlaceLink = addPlacePopup.querySelectorAll('.popup__input')[1];

//исходные карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function changePopupVisibility (popupName) {
  popupName.classList.toggle('popup_opened');
}

//edit popup
const showEditProfilePopup = () => {
  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;

  changePopupVisibility(editProfilePopup);
}

const closeEditProfilePopup = () => {
  changePopupVisibility(editProfilePopup);
}

function popupEditProfileFormSubmitHandler (evt) {
  evt.preventDefault();

  userName.textContent = inputUserName.value;
  userJob.textContent = inputUserJob.value;

  closeEditProfilePopup();
}

//add popup
const showAddPlacePopup = () => {
  changePopupVisibility(addPlacePopup);
}

const closeAddPlacePopup = () => {
  changePopupVisibility(addPlacePopup);
}

function popupAddPlaceFormSubmitHandler (evt) {
  evt.preventDefault();
  
  const newPlace = {};
  newPlace.name = inputPlaceTitle.value;
  newPlace.link = inputPlaceLink.value;

  createCard(newPlace);
  
  closeAddPlacePopup();
  
  inputPlaceTitle.value = '';
  inputPlaceLink.value = '';
}

//добавление карточек
function createCard (item) {
  const card = cardTemplate.querySelector('.cards__item').cloneNode(true);

  const cardImage = card.querySelector('.cards__image');
  const cardTitle = card.querySelector('.cards__title');
  const likeButton = card.querySelector('.cards__like-button');
  const trashButton = card.querySelector('.cards__trash-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardTitle.textContent = item.name;

  likeButton.addEventListener('click', (evt) => evt.target.classList.toggle('cards__like-button_active'));
  trashButton.addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  })
  
  cardsList.append(card);
}

initialCards.forEach(createCard);

editUserButton.addEventListener('click', showEditProfilePopup);
editProfilePopupCloseButton.addEventListener('click', closeEditProfilePopup);
editProfilePopupForm.addEventListener('submit', popupEditProfileFormSubmitHandler);

addPlaceButton.addEventListener('click', showAddPlacePopup);
addPlacePopupCloseButton.addEventListener('click', closeAddPlacePopup);
addPlacePopupForm.addEventListener('submit', popupAddPlaceFormSubmitHandler);
