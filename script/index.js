/* Объявление переменных*/
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddElementButton = document.querySelector('.profile__add-element-button');
/* Текст профиля*/
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
/* Инпуты попапа профиля*/
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupSubNameInput = document.querySelector('.popup__input_type_subname');
/* Инпуты попапа карточки*/
const popupElemTitleInput = document.querySelector('.popup__input_type_elem-title');
const popupElemImageInput = document.querySelector('.popup__input_type_elem-image');
//кнопки закрытия попапов
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
//попап просмотра карточки и его элементы
const popupElementView = document.querySelector('.popup_element-view');
const popupImage = popupElementView.querySelector('.popup__image');
const popupFigure = popupElementView.querySelector('.popup__figure');
//кнопки вызова попапа
const popupProfileEdit = document.querySelector('.popup_profile');
const popupAddElement = document.querySelector('.popup_element');
//контейнер элементов
const elements = document.querySelector('.elements');
//шаблон карточки
const elementTemplate = document.querySelector('#element').content;
//формы
const formAddElement = document.querySelector('#add_element');
const formEditProfile = document.querySelector('#edit_profile');

//конфигурационные функции
function makeProfileData(){
  const data = {};
  data.profTitle = profileTitle;
  data.profSubTitle = profileSubtitle;
  data.name = popupNameInput;
  data.subname = popupSubNameInput;
  return data
}
function makeElemData(){
  const data = {};
  data.elemImage = popupElemImageInput;
  data.elemTitle = popupElemTitleInput;
  data.elemTemplate = elementTemplate;
  return data
}
//конфигурация
const data_elem = makeElemData();
const data_profile = makeProfileData();


//функция открытия попапа
function openPopupWindow(popup){
  popup.classList.add('popup_visible');
}
// функция закрытия попапа
function closePopupWindow(popup){
  popup.classList.remove('popup_visible');
}
//функция удаления карточки
function removeElement(element){
  element.remove();
}

//функция отображения попапа редактирования профиля
function showProfileEditWindow(data_obj, popup){
  /*приводим значения полей ввода профиля в актуальное состояние*/
  data_obj.name.value = data_obj.profTitle.textContent ;
  data_obj.subname.value = data_obj.profSubTitle.textContent;
  /* добавление модификатора отображения попапа*/
  openPopupWindow(popup);
}
//функция отображения попапа добавления карточки
function showAddElementWindow(popup){
  /* добавление модификатора отображения попапа*/
  openPopupWindow(popup);
}
/*Функция рендеринга попапа карточки*/
function showElementPopup(data_obj){
  popupImage.src = data_obj.img.src;
  popupImage.alt = data_obj.title.textContent;
  popupFigure.textContent = data_obj.title.textContent;
  openPopupWindow(popupElementView);
}

//функция работы кнопки лайка
function toggleLikeButton(button){
  button.classList.toggle('element__like-button_active');
}

//обработчики элементов карточки
function handleLikeButton(evt){
  toggleLikeButton(evt.target);
}
function handleDeleteButton(evt){
  removeElement(evt.target.closest('.element'));
}
function handleImage(data_obj){
  showElementPopup(data_obj);
}
//
//
//функция получения новой карточки
function getElementCard(elemImageSrc , elemCardTitle, template){
  //склонировали шаблон в новую карточку
  const newElement = template.cloneNode(true);
  //выбираем элементы карточки
  const elementImage = newElement.querySelector('.element__image');
  const elementTitle = newElement.querySelector('.element__title');
  const elementDeleteButton = newElement.querySelector('.element__delete-button');
  const elementLikeButton = newElement.querySelector('.element__like-button');
  //записываем источник изображения
  elementImage.src = elemImageSrc;
  //записываем alt изображения из названия карточки
  elementImage.alt = elemCardTitle;
  //записываем название карточки
  elementTitle.textContent = elemCardTitle;
  var some_data = {};
  some_data.img =  elementImage;
  some_data.title = elementTitle;
  //обработчики
  elementDeleteButton.addEventListener('click', handleDeleteButton);
  //где some_data объект с данными
  elementImage.addEventListener('click', ()=>{handleImage(some_data)});
  elementLikeButton.addEventListener('click', handleLikeButton);
  //возвращаем готовую карточку
  return newElement;
}


/* Функция добавления карточки*/
// добавить куда -> что (все переменные)
function addElement(container, card){
  container.prepend(card);
}

/* Функция отправки формы*/
function submitAddPopupWindow(elements, data, popup){
  addElement(
            elements,
            getElementCard(
                          data.elemImage.value,
                          data.elemTitle.value,
                          data.elemTemplate
                          )
            );
  closePopupWindow(popup);
  data.elemTitle.value = '';
  data.elemImage.value = '';
}

//функция отправки формы
//принимает на вход объект в который входят объекты профиля и формы, также попап
function submitEditPopupWindow(data_obj, popup){
  /*приводим значения заголовков в актуальное состояние*/
  data_obj.profTitle.textContent = data_obj.name.value;
  data_obj.profSubTitle.textContent = data_obj.subname.value;
  //вызываем функцию закрытия с параметром "попап окно редактирования профиля"
  closePopupWindow(popup);
}

//обработчики слушателей
function handlerClosePopupWindow(evt){
  closePopupWindow(evt.target.closest('.popup'))
}
function handleProfileEditButton(){
  showProfileEditWindow(data_profile, popupProfileEdit);
}
function handleProfileAddButton(){
  showAddElementWindow(popupAddElement);
}
function handleSubmitEditPopupWindow(evt){
  evt.preventDefault();
  submitEditPopupWindow(data_profile, popupProfileEdit);
}
function handleSubmitAddPopupWindow(evt){
  evt.preventDefault();
  submitAddPopupWindow(elements, data_elem, popupAddElement);
}
//
//
//
//слушатели
popupCloseButtons.forEach( elem => {elem.addEventListener('click',handlerClosePopupWindow)});
profileEditButton.addEventListener('click', handleProfileEditButton);
profileAddElementButton.addEventListener('click', handleProfileAddButton);
formEditProfile.addEventListener('submit', handleSubmitEditPopupWindow);
formAddElement.addEventListener('submit', handleSubmitAddPopupWindow);
//
//
//
/*рендер заготовленных карточек*/
initialCards.forEach((elem) => {
                      addElement(
                        elements,
                        getElementCard(elem.link, elem.name, data_elem.elemTemplate)
                      )
});
