import "../pages/index.css";
import Validate from "./valid_class.js";
import { initialCards } from "./initial_cards.js";
import Card from "./card.js";
import PopupWithForm from "./popupwithform.js";
import PopupWithImage from "./popupwithimage.js";
import Section from "./section.js";
import UserInfo from "./userinfo.js";

/* Объявление переменных*/
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddElementButton = document.querySelector(
  ".profile__add-element-button"
);
const formAddElement = document.querySelector("#add_element");
const formEditProfile = document.querySelector("#edit_profile");

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputInvalidClass: "popup__input_state_invalid",
  buttonInvalidClass: "popup__submit_invalid",
};

//валидация формы добавления элемента
const formAddElementValidation = new Validate(validationConfig, formAddElement);
formAddElementValidation.enableValidation();
//валидация формы редактирования профиля
const formEditProfileValidation = new Validate(
  validationConfig,
  formEditProfile
);
formEditProfileValidation.enableValidation();

const cardConfig = {
  popup: ".popup_element-view",
  popupImage: ".popup__image",
  popupFigure: ".popup__figure",
  elementLikeButtonActive: "element__like-button_active",
  elementImage: ".element__image",
  elementTitle: ".element__title",
  elementDeleteButton: ".element__delete-button",
  elementLikeButton: ".element__like-button",
  element: "element",
  link: "",
  name: "",
};

const popupAdd = new PopupWithForm(
  ".popup_element",
  handleSubmitAddPopupWindow
);

const popupEdit = new PopupWithForm(
  ".popup_profile",
  handleSubmitEditPopupWindow
);

const popupView = new PopupWithImage(".popup_element-view");

const section = new Section(
  {
    items: initialCards,
    renderer: function f(item) {
      cardConfig.link = item.link;
      cardConfig.name = item.name;
      const cardTT = new Card(cardConfig, handleImage);
      section.addItem(cardTT.getElementCard());
    },
  },
  ".elements"
);
//отрисовка блока страницы с карточками

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userInfoSelector: ".profile__subtitle",
});

function handleImage({link , name}) {
  popupView.open({link: link, name: name});
}

function handleProfileEditButton() {
  /*приводим значения полей ввода профиля в актуальное состояние*/
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open();
}

function handleProfileAddButton() {
  formAddElementValidation.setButtonState();
  popupAdd.open();
}

function handleSubmitEditPopupWindow(data) {
  userInfo.setUserInfo(data);
  popupEdit.close();
}

function handleSubmitAddPopupWindow() {
  cardConfig.name = popupAdd._getInputValues().element_title;
  cardConfig.link = popupAdd._getInputValues().element_photo;
  const newCard = new Card(cardConfig, handleImage);
  section.addItem(newCard.getElementCard());
  popupAdd.close();
}

function startPage() {
  profileEditButton.addEventListener("click", handleProfileEditButton);
  profileAddElementButton.addEventListener("click", handleProfileAddButton);
  popupAdd.setEventListeners();
  popupEdit.setEventListeners();
  popupView.setEventListeners();
  section.render();
}

startPage();
