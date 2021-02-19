import Validate from "../components/valid_class.js";
import Card from "../components/card.js";
import PopupWithForm from "../components/popupwithform.js";
import PopupWithImage from "../components/popupwithimage.js";
import Section from "../components/section.js";
import UserInfo from "../components/userinfo.js";
import Api from "../components/api.js";
import PopupWithSubmit from "../components/popupwithsubmit.js";

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "09fc02d2-fbd7-401f-88be-c48180252452",
    "Content-Type": "application/json",
  },
});
const profileEditButton = document.querySelector(".profile__edit-button");
export const profileAddElementButton = document.querySelector(
  ".profile__add-element-button"
);
const profileAvatar = document.querySelector(".profile__photo-edit")
const formAddElement = document.querySelector("#add_element");
const formEditProfile = document.querySelector("#edit_profile");
const formEditAvatar = document.querySelector("#edit_avatar");
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputInvalidClass: "popup__input_state_invalid",
  buttonInvalidClass: "popup__submit_invalid",
};

export const formAddElementValidation = new Validate(
  validationConfig,
  formAddElement
);
export const formEditProfileValidation = new Validate(
  validationConfig,
  formEditProfile
);
export const formEditAvatarValidation = new Validate(
  validationConfig,
  formEditAvatar
);

export const cardConfig = {
  popup: ".popup_element-view",
  popupImage: ".popup__image",
  popupFigure: ".popup__figure",
  elementLikeButtonActive: "element__like-button_active",
  elementImage: ".element__image",
  elementTitle: ".element__title",
  elementDeleteButton: "element__delete-button",
  elementLikeButton: ".element__like-button",
  elementLikeCounter: ".element__like",
  element: "element",
  elementData: { link: "", name: "" },
};

// const popupAdd = new PopupWithForm(".popup_element", handleSubmitAddCard);

const popupEdit = new PopupWithForm(".popup_profile", handleSubmitEditProfile);

const popupAvatar = new PopupWithForm(".popup_avatar", handleAvatar);

// const popupView = new PopupWithImage(".popup_element-view");



// export const section = new Section(
//   {
//     api: api,
//     renderer: function f(item) {
//       cardConfig.elementData = {
//         link: item.link,
//         name: item.name,
//         userId: userInfo.getUserId(),
//         likes: item.likes,
//         id: item._id
//       };
//       // console.log(cardConfig)
//       const cardTT = new Card(api, cardConfig, { handleImage: handleImage });
//       section.addItem(cardTT.getElementCard());
//     },
//   },
//   ".elements"
// );

export const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userInfoSelector: ".profile__subtitle",
  userAvatarSelector: ".profile__photo",
});

function handleAvatar(src) {
  popupAvatar.setSubmitButtonState("Сохранение...");
  api
    .setAvatarPromise(src)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      console.log(res);
      popupAvatar.close();
      popupAvatar.setSubmitButtonState("Сохранить");
    })
    .catch((err) => console.log(`fuck err ${err}`));
}

// function handleImage({ link, name }) {
//   popupView.open({ link: link, name: name });
// }

function handleProfileEdit() {
  formEditProfileValidation.setButtonState();
  /*приводим значения полей ввода профиля в актуальное состояние*/
  popupEdit.setInputValues(userInfo.getUserInfo());
  formEditProfileValidation.checkForm();
  popupEdit.open();
}

function handleAvatarOpen(){
  popupAvatar.open()
}

// function handleAddCard() {
//   formAddElementValidation.hideErrors();
//   formAddElementValidation.setButtonState();
//   popupAdd.open();
// }

function handleSubmitEditProfile(data) {
  popupEdit.setSubmitButtonState("Сохранение...");
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({ userName: res.name, userAbout: res.about });
      popupEdit.setSubmitButtonState("Сохранить");
    })
    .catch((err) => console.log(err));
  popupEdit.close();
}

// function handleSubmitAddCard(data) {
//   cardConfig.elementData = {
//     link: data.element_photo,
//     name: data.element_title,
//   };
//   cardConfig.elementData.userId = cardConfig.elementData.ownerId = userInfo.getUserId();
//   console.log(cardConfig.elementData);
//   const newCard = new Card(api, cardConfig, { handleImage: handleImage });
//   // section.postItem(newCard.getElementCard(), {
//   //   name: cardConfig.elementData.name,
//   //   link: cardConfig.elementData.link,
//   // });
//   section.addItem(newCard.getElementCard())
//   popupAdd.close();
// }

export const setUserInfo = (res) => {
  userInfo.setUserInfo({
    userName: res.name,
    userAbout: res.about,
  });
  userInfo.setUserId(res._id);
  userInfo.setUserAvatar(res.avatar);
};

export const startPage = () => {
  profileEditButton.addEventListener("click", handleProfileEdit);
  // profileAddElementButton.addEventListener("click", handleAddCard);
  profileAvatar.addEventListener("click", handleAvatarOpen);
  popupAvatar.setEventListeners();
  // popupAdd.setEventListeners();
  popupEdit.setEventListeners();
  // popupView.setEventListeners();
};
