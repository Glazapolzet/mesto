const page = document.querySelector('.page');
const cardTemplate = document.querySelector('#card').content;

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

const popupFormAddPlace = popupAddPlace.querySelector('.popup__form');
const inputPlaceTitle = popupAddPlace.querySelector('.popup__input_content_place-title');
const inputPlaceLink = popupAddPlace.querySelector('.popup__input_content_place-link');

const picture = pictureModal.querySelector('.picture-modal__picture');
const pictureCaption = pictureModal.querySelector('.picture-modal__caption');


function showPopup (popupName) {
  popupName.classList.add('popup_opened');
}

function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
}

function closeButtonsAddHandler () {
  const buttonsClose = page.querySelectorAll('.popup__close-button');
  buttonsClose.forEach(buttonClose => buttonClose.addEventListener('click', () => closePopup(buttonClose.closest('.popup'))));
}

function editProfilePopupFormSubmitHandler (evt) {
  evt.preventDefault();

  userName.textContent = inputUserName.value;
  userJob.textContent = inputUserJob.value;

  closePopup(popupEditProfile);
}

function addPlacePopupFormSubmitHandler (evt) {
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

initialCards.forEach(item => cardsList.append(createCard(item)));
closeButtonsAddHandler();

buttonEditUser.addEventListener('click', () => {
  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;

  showPopup(popupEditProfile);
});
popupFormEditProfile.addEventListener('submit', editProfilePopupFormSubmitHandler);

buttonAddPlace.addEventListener('click', () => showPopup(popupAddPlace));
popupFormAddPlace.addEventListener('submit', addPlacePopupFormSubmitHandler);
