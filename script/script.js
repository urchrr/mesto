/* Объявление переменных*/
let popupWindow = document.querySelector('.popup');

let profileEditButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupForm = document.querySelector('.popup__form');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupNameInput = document.querySelector('.popup__input_type_name');
let popupSubNameInput = document.querySelector('.popup__input_type_subname');


/* Функция открытия попапа*/
function openPopupWindow(){
  /*приводим значения полей ввода в актуальное состояние*/
  popupNameInput.value = profileTitle.textContent ;
  popupSubNameInput.value = profileSubtitle.textContent;
  /* добавление модификатора отображения попапа*/
  popupWindow.classList.add('popup_visible');
}

/* Функция закрытия попапа*/
function closePopupWindow(){
  /* удаление модификатора отображения попапа*/
  popupWindow.classList.remove('popup_visible');
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

/*вешаем лисенер на кнопку редактирвоания профиля*/
profileEditButton.addEventListener('click',openPopupWindow);

/*вешаем лисенер на кнопку закрытия попапа*/
popupCloseButton.addEventListener('click',closePopupWindow);

/*вешаем лисенер на отправку формы*/
popupForm.addEventListener('submit',submitPopupWindow);







