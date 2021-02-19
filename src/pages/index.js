import "./index.css";
import * as cs from "../components/constants.js";
import Card from "../components/card.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/popupWithForm.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithSubmit from "../components/popupwithsubmit";
import Validate from "../components/validСlass.js";
import UserInfo from "../components/userinfo.js";
import Api from "../components/api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "09fc02d2-fbd7-401f-88be-c48180252452",
    "Content-Type": "application/json",
  },
});

const formAddElementValidation = new Validate(
  cs.validationConfig,
  cs.formAddElement
);
const formEditProfileValidation = new Validate(
  cs.validationConfig,
  cs.formEditProfile
);
const formEditAvatarValidation = new Validate(
  cs.validationConfig,
  cs.formEditAvatar
);
const popupEdit = new PopupWithForm(".popup_profile", handleSubmitEditProfile);
const popupAvatar = new PopupWithForm(".popup_avatar", handleAvatar);

const userInfo = new UserInfo({
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

function handleProfileEdit() {
  formEditProfileValidation.setButtonState();
  /*приводим значения полей ввода профиля в актуальное состояние*/
  popupEdit.setInputValues(userInfo.getUserInfo());
  formEditProfileValidation.checkForm();
  popupEdit.open();
}

function handleAvatarOpen() {
  popupAvatar.open();
}

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

const setUserInfo = (res) => {
  userInfo.setUserInfo({
    userName: res.name,
    userAbout: res.about,
  });
  userInfo.setUserId(res._id);
  userInfo.setUserAvatar(res.avatar);
};

formAddElementValidation.enableValidation();
formEditProfileValidation.enableValidation();
formEditAvatarValidation.enableValidation();

api
  .getUserInfoPromise()
  .then((res) => {
    // console.log(res);
    setUserInfo(res);
  })
  .catch((err) => console.log(err));

api
  .getInitialCardsPromise()
  .then((res) => {
    const popupAdd = new PopupWithForm(".popup_element", handleSubmitAddCard);
    const popupView = new PopupWithImage(".popup_element-view");
    const popupDeleteCard = new PopupWithSubmit(
      ".popup_delete-card",
      handleDeleteSubmitCard
    );
    const section = new Section(
      {
        items: res,
        renderer: function f(item) {
          cs.cardConfig.elementData = {
            link: item.link,
            name: item.name,
            ownerId: item.owner._id,
            userId: userInfo.getUserId(),
            likes: item.likes,
            id: item._id,
          };
          // console.log(cardConfig)

          section.addItem(createCard());
        },
      },
      ".elements"
    );

    function handleCardImage({ link, name }) {
      popupView.open({ link: link, name: name });
    }

    function handleDeleteSubmitCard(data) {
      popupDeleteCard.setSubmitButtonState("Удаляем...");
      api
        .deleteCard(data.id)
        .then((res) => {
          console.log(res);
          data.card.remove();
        })
        .catch((err) => console.log(err));
      popupDeleteCard.close();
      popupDeleteCard.setSubmitButtonState("Да");
    }

    function handlePopupDelete(id, card) {
      popupDeleteCard.open({ id: id, card: card });
    }

    function createCard() {
      const newCard = new Card(
        cs.cardConfig,
        {
          handleImage: handleCardImage,
          handleDelete: handlePopupDelete,
        },
        api
      );
      return newCard.getElementCard();
    }

    function handleSubmitAddCard(data) {
      api
        .addNewCardPromise({
          name: data.element_title,
          link: data.element_photo,
        })
        .then((res) => {
          cs.cardConfig.elementData = {
            link: res.link,
            name: res.name,
            ownerId: res.owner._id,
            userId: userInfo.getUserId(),
            likes: res.likes,
            createdAt: res.createdAt,
          };
          // console.log(cardConfig.elementData);
          section.addItem(createCard());
          popupAdd.close();
        })
        .catch((err) => console.log(err));
    }

    function handleAddCard() {
      formAddElementValidation.hideErrors();
      formAddElementValidation.setButtonState();
      popupAdd.open();
    }
    const startPage = () => {
      cs.profileEditButton.addEventListener("click", handleProfileEdit);
      cs.profileAddElementButton.addEventListener("click", handleAddCard);
      cs.profileAvatar.addEventListener("click", handleAvatarOpen);
      popupAvatar.setEventListeners();
      popupAdd.setEventListeners();
      popupDeleteCard.setEventListeners();
      popupEdit.setEventListeners();
      popupView.setEventListeners();
    };

    startPage();
    section.render();
  })
  .catch((err) => console.log(err));
