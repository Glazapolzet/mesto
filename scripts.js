const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');

const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const profileEditButton = profile.querySelector('.profile__edit-button');


function showPopup () {
    let inputUserName = popup.querySelector('.popup__input_content_name');
    let inputUserJob = popup.querySelector('.popup__input_content_job');

    let userName = profile.querySelector('.profile__name');
    let userJob = profile.querySelector('.profile__job');

    inputUserName.value = userName.textContent;
    inputUserJob.value = userJob.textContent;

    popup.classList.add('popup_opened');
}


function closePopup () {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault();

    let inputUserName = popup.querySelector('.popup__input_content_name');
    let inputUserJob = popup.querySelector('.popup__input_content_job');

    let userName = profile.querySelector('.profile__name');
    let userJob = profile.querySelector('.profile__job');

    userName.textContent = inputUserName.value;
    userJob.textContent = inputUserJob.value;

    closePopup();
}

profileEditButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);