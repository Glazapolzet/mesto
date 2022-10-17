const page = document.querySelector('.page');

const profile = page.querySelector('.profile');
const editProfilePopup = page.querySelector('.popup_use_edit-profile');
const addPlacePopup = page.querySelector('.popup_use_add-place');

const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');
const editProfilePopupForm = editProfilePopup.querySelector('.popup__form');
const inputUserName = editProfilePopup.querySelectorAll('.popup__input')[0];
const inputUserJob = editProfilePopup.querySelectorAll('.popup__input')[1];

const addPlacePopupCloseButton = addPlacePopup.querySelector('.popup__close-button');
const addPlacePopupForm = addPlacePopup.querySelector('.popup__form');

const profileEditUserButton = profile.querySelector('.profile__edit-user-button');
const profileAddPlaceButton = profile.querySelector('.profile__add-place-button');
const userName = profile.querySelector('.profile__name');
const userJob = profile.querySelector('.profile__job');

//исходные карточки
const cardTemplate = document.querySelector('#card').content;
const cardsList = page.querySelector('.cards__list');
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


function showPopup(popupName) {
    popupName.classList.add('popup_opened');
}

function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
}

//edit popup
function showEditProfilePopup() {
    inputUserName.value = userName.textContent;
    inputUserJob.value = userJob.textContent;

    showPopup(editProfilePopup);
}

function closeEditProfilePopup() {
    closePopup(editProfilePopup);
}

//add popup
function showAddPlacePopup() {
    showPopup(addPlacePopup);
}

function closeAddPlacePopup() {
    closePopup(addPlacePopup);
}

function popupEditProfileFormSubmitHandler(evt) {
    evt.preventDefault();

    userName.textContent = inputUserName.value;
    userJob.textContent = inputUserJob.value;

    closeEditProfilePopup();
}

//добавление карточек при загрузке страницы
function createCard (item) {
    const card = cardTemplate.querySelector('.cards__item').cloneNode(true);
    
    const cardImage = card.querySelector('.cards__image');
    const cardTitle = card.querySelector('.cards__title');
    
    cardImage.src = item.link;
    cardImage.alt = item.name;
    
    cardTitle.textContent = item.name;
    
    cardsList.append(card);
}

initialCards.forEach(createCard);

profileEditUserButton.addEventListener('click', showEditProfilePopup);
editProfilePopupCloseButton.addEventListener('click', closeEditProfilePopup);
editProfilePopupForm.addEventListener('submit', popupEditProfileFormSubmitHandler);

profileAddPlaceButton.addEventListener('click', showAddPlacePopup);
addPlacePopupCloseButton.addEventListener('click', closeAddPlacePopup);
