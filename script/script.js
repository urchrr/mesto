/* Объявление переменных*/
let popupWindow = document.querySelector('.popup');
let popupProfileWindow = document.querySelector('.popup__profile');
let popupElementWindow = document.querySelector('.popup__element');

let elementImage = document.querySelector('.element__image');
let elementTitle = document.querySelector('.element__title');

let elementAddButton = document.querySelector('.profile__add-element-button');
let profileEditButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupForm = document.querySelector('.popup__form');
let popupCloseButton = document.querySelectorAll('.popup__close-button');
let popupNameInput = document.querySelector('.popup__input_type_name');
let popupSubNameInput = document.querySelector('.popup__input_type_subname');

/* Функция открытия попапа*/
function openPopupProfileWindow(){
  /*приводим значения полей ввода в актуальное состояние*/
  popupNameInput.value = profileTitle.textContent ;
  popupSubNameInput.value = profileSubtitle.textContent;
  /* добавление модификатора отображения попапа*/
  popupProfileWindow.classList.add('popup_visible');
}

function openPopupElementWindow(){
  popupElementWindow.classList.add('popup_visible');
}
/* Функция закрытия попапа*/
function closePopupWindow(evt){
  evt.target.closest('.popup').classList.remove('popup_visible');
  /* удаление модификатора отображения попапа*/
  /* popupWindow.classList.remove('popup_visible');*/
}

/* Функция отправки формы*/
function submitPopupWindow(evt){
  /*отменяем вносимые стандартные значения*/
  evt.preventDefault();
  /*приводим значения заголовков в актуальное состояние*/
  profileTitle.textContent = popupNameInput.value ;
  profileSubtitle.textContent = popupSubNameInput.value ;
  /*закрываем все*/
  closePopupWindow();
}

elementAddButton.addEventListener('click', openPopupElementWindow);
/*вешаем лисенер на кнопку редактирвоания профиля*/
profileEditButton.addEventListener('click',openPopupProfileWindow);

/*вешаем лисенер на кнопку закрытия попапа*/
popupCloseButton.forEach( elem => {elem.addEventListener('click',closePopupWindow)});

/*вешаем лисенер на отправку формы*/
popupForm.addEventListener('submit',submitPopupWindow);







