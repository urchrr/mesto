/* Объявление переменных*/
//if (initialCards){console.log('its here');} else {console.log('nope');};
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

const popupForm = document.querySelectorAll('.popup__form');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const popupElementView = document.querySelector('.popup_element-view');
const popupImage = popupElementView.querySelector('.popup__image');
const popupFigure = popupElementView.querySelector('.popup__figure');

const popupProfileEdit = document.querySelector('.popup_profile');
const popupAddElement = document.querySelector('.popup_element');

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;
const formAddElement = document.querySelector('#add_element');
const formEditProfile = document.querySelector('#edit_profile');

//функция удаления карточку
function removeElement(element){
  element.remove();
}

//функция отображения попапа редактирования профиля
function showProfileEditWindow(popup){
  /*приводим значения полей ввода профиля в актуальное состояние*/
  popupNameInput.value = profileTitle.textContent ;
  popupSubNameInput.value = profileSubtitle.textContent;
  /* добавление модификатора отображения попапа*/
  openPopupWindow(popup);
}

//функция отображения попапа добавления карточки
function showAddElementWindow(popup){
  popupElemTitleInput.value = '';
  popupElemImageInput.value = '';
  /* добавление модификатора отображения попапа*/
  openPopupWindow(popup);
}

//функция работы кнопки лайка
function toggleLikeButton(button){
  button.classList.toggle('element__like-button_active');
}

//функция открытия попапа
function openPopupWindow(popup){
  popup.classList.add('popup_visible');
}
// функция закрытия попапа
function closePopupWindow(popup){
  popup.classList.remove('popup_visible');
}
/* Функция закрытия попапа*/
function handlerClosePopupWindow(evt){
  /* удаление модификатора отображения попапа*/
  closePopupWindow(evt.target.closest('.popup'))
}


/*Функция рендеринга попапа карточки*/
function showElementPopup(element){
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  popupImage.src = elementImage.src;
  popupImage.alt = elementTitle.textContent;
  popupFigure.textContent = elementTitle.textContent;
  openPopupWindow(popupElementView);
}

//функция получения новой карточки
function getElementCard(imgLink, title, template){
  const newElement = template.cloneNode(true);
  newElement.querySelector('.element__image').src = imgLink;
  newElement.querySelector('.element__title').textContent = title;
  newElement.querySelector('.element__delete-button').addEventListener('click', (evt) => {
    removeElement(evt.target.closest('.element'));
  });
  newElement.querySelector('.element__image').addEventListener('click', (evt) => showElementPopup(evt.target.closest('.element')));
  newElement.querySelector('.element__like-button').addEventListener('click', (evt) => toggleLikeButton(evt.target)); 
  return newElement;
}

/* Функция добавления карточки*/
function addElement(imgLink, title, template){
  elements.prepend(getElementCard(imgLink, title, template));
}

/* Функция отправки формы*/
function submitAddPopupWindow(ImageInput,TitleInput,Template, Popup){
  addElement(ImageInput.value,TitleInput.value,Template);
  closePopupWindow(Popup);
}

//функция отправки формы
function submitEditPopupWindow(Title,Subtitle, NameInput,SubnameInput,popup){
  /*приводим значения заголовков в актуальное состояние*/
  Title.textContent = NameInput.value ;
  Subtitle.textContent = SubnameInput.value ;
  //вызываем функцию закрытия с параметром "попап окно редактирования профиля"
  closePopupWindow(popup);
}

/*вешаем лисенер на кнопки закрытия попапа*/
popupCloseButtons.forEach( elem => {elem.addEventListener('click',handlerClosePopupWindow)});

/*рендер заготовленных карточек*/
initialCards.forEach(elem => addElement(elem.link,elem.name,elementTemplate));


profileEditButton.addEventListener('click', () => showProfileEditWindow(popupProfileEdit));
profileAddElementButton.addEventListener('click', () => showProfileEditWindow(popupAddElement));

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitEditPopupWindow(profileTitle,profileSubtitle,popupNameInput,popupSubNameInput);
});

formAddElement.addEventListener('submit',(evt)=>{
  submitAddPopupWindow(popupElemImageInput,popupElemTitleInput,popupAddElement)
});