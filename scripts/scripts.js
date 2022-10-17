const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const page = document.querySelector('.page');

const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const profileEditButton = profile.querySelector('.profile__edit-button');

let inputUserName = popup.querySelectorAll('.popup__input')[0];
let inputUserJob = popup.querySelectorAll('.popup__input')[1];
let userName = profile.querySelector('.profile__name');
let userJob = profile.querySelector('.profile__job');

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

function showPopup() {
    inputUserName.value = userName.textContent;
    inputUserJob.value = userJob.textContent;

    popup.classList.add('popup_opened');
}


function closePopup() {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
    evt.preventDefault();

    userName.textContent = inputUserName.value;
    userJob.textContent = inputUserJob.value;

    closePopup();
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

profileEditButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);