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
  popupNameInput.value = profileTitle.textContent ;
  popupSubNameInput.value = profileSubtitle.textContent;
  popupWindow.classList.add('popup_visible');
}

/* Функция закрытия попапа*/
function closePopupWindow(){
  popupWindow.classList.remove('popup_visible');
}

/* Функция отправки формы*/
function submitPopupWindow(evt){
  evt.preventDefault();
  profileTitle.textContent = popupNameInput.value ;
  profileSubtitle.textContent = popupSubNameInput.value ;
  console.log('hi!!');
  closePopupWindow();
}

profileEditButton.addEventListener('click',openPopupWindow);

popupCloseButton.addEventListener('click',closePopupWindow);

popupForm.addEventListener('submit',submitPopupWindow);







