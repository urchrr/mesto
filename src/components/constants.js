export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileAddElementButton = document.querySelector(
  ".profile__add-element-button"
);
export const profileAvatar = document.querySelector(".profile__photo-edit")
export const formAddElement = document.querySelector("#add_element");
export const formEditProfile = document.querySelector("#edit_profile");
export const formEditAvatar = document.querySelector("#edit_avatar");
export const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputInvalidClass: "popup__input_state_invalid",
  buttonInvalidClass: "popup__submit_invalid",
};

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
