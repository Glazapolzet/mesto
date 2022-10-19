const page = document.querySelector('.page');
const cardTemplate = document.querySelector('#card').content;

const cardsList = page.querySelector('.cards__list');
const profile = page.querySelector('.profile');
const pictureModal = page.querySelector('.picture-modal');

const editProfilePopup = page.querySelector('.popup_use_edit-profile');
const addPlacePopup = page.querySelector('.popup_use_add-place');

const editUserButton = profile.querySelector('.profile__edit-user-button');
const addPlaceButton = profile.querySelector('.profile__add-place-button');

const userName = profile.querySelector('.profile__name');
const userJob = profile.querySelector('.profile__job');

const editProfilePopupForm = editProfilePopup.querySelector('.popup__form');
const inputUserName = editProfilePopup.querySelector('.popup__input_content_user-name');
const inputUserJob = editProfilePopup.querySelector('.popup__input_content_user-job');

const addPlacePopupForm = addPlacePopup.querySelector('.popup__form');
const inputPlaceTitle = addPlacePopup.querySelector('.popup__input_content_place-title');
const inputPlaceLink = addPlacePopup.querySelector('.popup__input_content_place-link');

const picture = pictureModal.querySelector('.picture-modal__picture');
const pictureCaption = pictureModal.querySelector('.picture-modal__caption');

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

function closeButtonsAddHandler () {
  const closeButtons = page.querySelectorAll('.popup__close-button');
  closeButtons.forEach(closeButton => closeButton.addEventListener('click', () => changePopupVisibility(closeButton.closest('.popup'))));
}

function editProfilePopupFormSubmitHandler (evt) {
  evt.preventDefault();

  userName.textContent = inputUserName.value;
  userJob.textContent = inputUserJob.value;

  changePopupVisibility(editProfilePopup);
}

function addPlacePopupFormSubmitHandler (evt) {
  evt.preventDefault();
  
  const newPlace = {};
  newPlace.name = inputPlaceTitle.value;
  newPlace.link = inputPlaceLink.value;

  cardsList.prepend(createCard(newPlace));

  changePopupVisibility(addPlacePopup);
  
  inputPlaceTitle.value = '';
  inputPlaceLink.value = '';
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
    pictureCaption.textContent = cardTitle.textContent;
    
    changePopupVisibility(pictureModal);
  })
  
  return card;
}


initialCards.forEach(item => cardsList.append(createCard(item)));
closeButtonsAddHandler();

editUserButton.addEventListener('click', () => {
  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;

  changePopupVisibility(editProfilePopup);
});
editProfilePopupForm.addEventListener('submit', editProfilePopupFormSubmitHandler);

addPlaceButton.addEventListener('click', () => changePopupVisibility(addPlacePopup));
addPlacePopupForm.addEventListener('submit', addPlacePopupFormSubmitHandler);
