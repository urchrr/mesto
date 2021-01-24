import {Validate} from './valid_class.js'
import {initialCards} from './initial-cards.js'
import {Card} from './card.js'
import {openPopupWindow, closePopupWindow} from './utils.js'
/* Объявление переменных*/
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddElementButton = document.querySelector(
  ".profile__add-element-button"
);
/* Текст профиля*/
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
/* Инпуты попапа профиля*/
const popupNameInput = document.querySelector(".popup__input_type_name");
const popupSubNameInput = document.querySelector(".popup__input_type_subname");
/* Инпуты попапа карточки*/
const popupElemTitleInput = document.querySelector(
  ".popup__input_type_elem-title"
);
const popupElemImageInput = document.querySelector(
  ".popup__input_type_elem-image"
);
//кнопки закрытия попапов
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
//попап просмотра карточки и его элементы
const popupElementView = document.querySelector(".popup_element-view");
const popupImage = popupElementView.querySelector(".popup__image");
const popupFigure = popupElementView.querySelector(".popup__figure");
//кнопки вызова попапа
const popupProfileEdit = document.querySelector(".popup_profile");
const popupAddElement = document.querySelector(".popup_element");
//контейнер элементов
const elements = document.querySelector(".elements");
//шаблон карточки
const elementTemplate = document.querySelector("#element").content;
//формы
const formAddElement = document.querySelector("#add_element");
const formEditProfile = document.querySelector("#edit_profile");

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__submit_invalid',
};

//валидация формы добавления элемента
const formAddElementValidation = new Validate(validationConfig, formAddElement);
formAddElementValidation.enableValidation();
//валидация формы редактирования профиля
const formEditProfileValidation = new Validate(validationConfig, formEditProfile);
formEditProfileValidation.enableValidation();

const cardConfig = {
  popup: '.popup_element-view',
  popupImage: '.popup__image',
  popupFigure: '.popup__figure',
  elementLikeButtonActive: 'element__like-button_active',
  elementImage: '.element__image',
  elementTitle: '.element__title',
  elementDeleteButton: '.element__delete-button',
  elementLikeButton: '.element__like-button',
  element:'element',
  link:'',
  name:'',
}

/* Функция добавления карточки*/


function handleImage(imageData) {
  popupImage.src = imageData.link;
  popupImage.alt = imageData.name;
  popupFigure.textContent = imageData.name;
  openPopupWindow(popupElementView);
}

function addElement(container) {
  const card = new Card(cardConfig, handleImage);
  container.prepend(card.getElementCard());
}

function handleProfileEditButton() {
  /*приводим значения полей ввода профиля в актуальное состояние*/
  popupNameInput.value = profileTitle.textContent;
  popupSubNameInput.value = profileSubtitle.textContent;
  /* добавление модификатора отображения попапа*/
  openPopupWindow(popupProfileEdit);
}

function handleSubmitEditPopupWindow(evt) {
  evt.preventDefault();
  /*приводим значения заголовков в актуальное состояние*/
  profileTitle.textContent = popupNameInput.value;
  profileSubtitle.textContent = popupSubNameInput.value;
  //вызываем функцию закрытия с параметром "попап окно редактирования профиля"
  closePopupWindow(popupProfileEdit);
}

function handleProfileAddButton() {
  formAddElementValidation.setButtonState();
  openPopupWindow(popupAddElement);
}


function handleSubmitAddPopupWindow(evt) {
  evt.preventDefault();
  cardConfig.name = popupElemTitleInput.value;
  cardConfig.link = popupElemImageInput.value;
  addElement(elements);
  closePopupWindow(popupAddElement);
  formAddElement.reset();
}
//слушатели
popupCloseButtons.forEach((elem) => {
  elem.addEventListener("click", (evt) =>
    closePopupWindow(evt.target.closest(".popup"))
  );
});
profileEditButton.addEventListener("click", handleProfileEditButton);
profileAddElementButton.addEventListener("click", handleProfileAddButton);
formEditProfile.addEventListener("submit", handleSubmitEditPopupWindow);
formAddElement.addEventListener("submit", handleSubmitAddPopupWindow);

/*рендер заготовленных карточек*/
initialCards.forEach((elem) => {
  cardConfig.name = elem.name;
  cardConfig.link = elem.link;
  addElement(elements);
}
);
