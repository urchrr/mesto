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

function handlePopupClose(evt){
  if(evt.target===evt.currentTarget){
    closePopupWindow(evt.currentTarget);
  }
}

function handlePopupEscape(evt){
  if (evt.key === 'Escape') {
    closePopupWindow(evt.currentTarget);
  }
}
//функция открытия попапа
function openPopupWindow(popup) {
  console.log(popup.firstElementChild)
  popup.addEventListener('click', handlePopupClose);
  popup.addEventListener('keydown', handlePopupEscape);
  popup.classList.add("popup_visible");
}
//функция закрытия попапа
function closePopupWindow(popup) {
  popup.removeEventListener('click', handlePopupClose);
  popup.removeEventListener("keydown", handlePopupEscape);
  popup.classList.remove("popup_visible");
}
//обработчики элементов карточки
function handleLikeButton(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

function handleDeleteButton(evt) {
  evt.target.closest(".element").remove();
}

function handleImage(imageData) {
  popupImage.src = imageData.link;
  popupImage.alt = imageData.name;
  popupFigure.textContent = imageData.name;
  openPopupWindow(popupElementView);
}
//функция получения новой карточки
function getElementCard(imageData, template) {
  //склонировали шаблон в новую карточку
  const newElement = template.cloneNode(true);
  //выбираем элементы карточки
  const elementImage = newElement.querySelector(".element__image");
  const elementTitle = newElement.querySelector(".element__title");
  const elementDeleteButton = newElement.querySelector(
    ".element__delete-button"
  );
  const elementLikeButton = newElement.querySelector(".element__like-button");
  //записываем источник изображения
  elementImage.src = imageData.link;
  //записываем alt изображения из названия карточки
  elementImage.alt = imageData.name;
  //записываем название карточки
  elementTitle.textContent = imageData.name;
  //обработчики
  elementDeleteButton.addEventListener("click", handleDeleteButton);
  //где some_data объект с данными
  elementImage.addEventListener("click", () => {
    handleImage(imageData);
  });
  elementLikeButton.addEventListener("click", handleLikeButton);
  //возвращаем готовую карточку
  return newElement;
}
/* Функция добавления карточки*/
function addElement(container, card) {
  container.prepend(card);
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
  setButtonState(formAddElement.elements.submit, formAddElement.checkValidity(), validationConfig)
  openPopupWindow(popupAddElement);
}

function handleSubmitAddPopupWindow(evt) {
  evt.preventDefault();
  addElement(
    elements,
    getElementCard(
      { name: popupElemTitleInput.value, link: popupElemImageInput.value },
      elementTemplate
    )
  );
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
initialCards.forEach((elem) =>
  addElement(elements, getElementCard(elem, elementTemplate))
);
