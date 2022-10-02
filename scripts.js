const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');

const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__container');
const profileEditButton = profile.querySelector('.profile__edit-button');

function showPopup () {
    let inputUserName = popup.querySelector('.popup__input_content_name');
    let inputUserDescription = popup.querySelector('.popup__input_content_description');

    let userName = profile.querySelector('.profile__name');
    let userDescription = profile.querySelector('.profile__description');

    inputUserName.value = userName.textContent;
    inputUserDescription.value = userDescription.textContent;

    popup.classList.add('popup_opened');
}


function closePopup () {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault();

    let inputUserName = popup.querySelector('.popup__input_content_name');
    let inputUserDescription = popup.querySelector('.popup__input_content_description');

    let userName = profile.querySelector('.profile__name');
    let userDescription = profile.querySelector('.profile__description');

    userName.textContent = inputUserName.value;
    userDescription.textContent = inputUserDescription.value;

    closePopup();
}

profileEditButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);