/* Объявление переменных*/
let popupWindow = document.querySelector('.popup');
let popupProfileWindow = document.querySelector('.popup__profile');
let popupElementWindow = document.querySelector('.popup__element');

let elementImage = document.querySelector('.element__image');
console.log(elementImage);
let elementTitle = document.querySelector('.element__title');
console.log(elementTitle);
let elementAddButton = document.querySelector('.profile__add-element-button');
let profileEditButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupForm = document.querySelectorAll('.popup__form');
let popupCloseButton = document.querySelectorAll('.popup__close-button');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

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
  console.log('do');
  /*приводим значения заголовков в актуальное состояние*/
  if(evt.target.closest(".popup__element")){
    console.log('target element');
    let popupElemTitleInput = document.querySelector('.popup__input_type_elem-title');
    let popupElemImageInput = document.querySelector('.popup__input_type_elem-image');
    console.log(elementTitle);
    elementTitle.textContent = popupElemTitleInput.value ;
    elementImage.src = popupElemImageInput.value ;
  }
  else if(evt.target.closest(".popup__profile")){
    console.log('target profile');
    let popupNameInput = document.querySelector('.popup__input_type_name');
    let popupSubNameInput = document.querySelector('.popup__input_type_subname');

    profileTitle.textContent = popupNameInput.value ;
    profileSubtitle.textContent = popupSubNameInput.value ;
  }

  /*закрываем все*/
  closePopupWindow();
}

elementAddButton.addEventListener('click', openPopupElementWindow);
/*вешаем лисенер на кнопку редактирвоания профиля*/
profileEditButton.addEventListener('click',openPopupProfileWindow);

/*вешаем лисенер на кнопку закрытия попапа*/
popupCloseButton.forEach( elem => {elem.addEventListener('click',closePopupWindow)});

/*вешаем лисенер на отправку формы*/
popupForm.forEach(elem=>{elem.addEventListener('submit',submitPopupWindow)});
const elements = document.querySelector('.elements');
function addElement(img, title){
  const elementTemplate = document.querySelector('#element').content;
  const newElement = elementTemplate.cloneNode(true);
  newElement.querySelector('.element__image').src = img;
  newElement.querySelector('.element__title').textContent = title;
  elements.append(newElement);
}

initialCards.forEach(elem => console.log(elem.name));
initialCards.forEach(elem => addElement(elem.link,elem.name));

console.log(elements);



