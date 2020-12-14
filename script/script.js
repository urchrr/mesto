/* Объявление переменных*/
/* Текст профиля*/
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
/* Инпуты попапа профиля*/
let popupNameInput = document.querySelector('.popup__input_type_name');
let popupSubNameInput = document.querySelector('.popup__input_type_subname');
/* Инпуты попапа карточки*/
let popupElemTitleInput = document.querySelector('.popup__input_type_elem-title');
let popupElemImageInput = document.querySelector('.popup__input_type_elem-image');

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

/*добавление слушателя на страницу*/
document.querySelector('.page').addEventListener('click',elementListener);

/*обработчик слушателя страницы*/
function elementListener(evt){
  let tar = evt.target;
  console.log(tar);console.log(tar.classList);
  /* кнопка удаления карточки*/
  if(tar.classList.contains('element__delete-button')){
    console.log('tar delete');
    /* поиск в дом родителя - карточку и удаление элемента*/
    tar.closest('.element').remove();
  }
  /* просмотр содержимого карчтоки*/
  else if (tar.classList.contains('element__image')){
    console.log('tar image');
    showElementPopup(tar.closest('.element'));
  }
  /* кнопка лайка на карточке*/
  else if (tar.classList.contains('element__like-button')){
    console.log('tar like');
    tar.closest('.element__like-button').classList.toggle('element__like-button_active');
  }
  /* кнопка добавления карточки*/
  else if (tar.classList.contains('profile__add-element-button')){
    console.log('tar add elem');
    popupElemTitleInput.value = '';
    popupElemImageInput.value = '';
    /* добавление модификатора отображения попапа*/
    document.querySelector('.popup__element').classList.add('popup_visible');
  }
  /* кнопка редактирования профиля*/
  else if (tar.classList.contains('profile__edit-button')){
    console.log('tar edit profile');
    /*приводим значения полей ввода профиля в актуальное состояние*/
    popupNameInput.value = profileTitle.textContent ;
    popupSubNameInput.value = profileSubtitle.textContent;
    /* добавление модификатора отображения попапа*/
    document.querySelector('.popup__profile').classList.add('popup_visible');
  }
}

/*Функция рендеринга попапа карточки*/
function showElementPopup(element){
  console.log('func show')
  let popup = document.querySelector('.popup__element-view');
  let elementImage = element.querySelector('.element__image');
  let elementTitle = element.querySelector('.element__title');
  let popupImage = popup.querySelector('.popup__image');
  let popupFigure = popup.querySelector('.popup__figure');
  popupImage.src = elementImage.src;
  popupImage.alt = elementTitle.textContent;
  popupFigure.textContent = elementTitle.textContent;
  popup.classList.add('popup_visible');
}
/* Функция закрытия попапа*/
function closePopupWindow(evt){
  let tar = evt.target;
  /* удаление модификатора отображения попапа*/
  tar.closest('.popup').classList.remove('popup_visible');
}


/* Функция рендера карточки*/
function addElement(img, title){
  const elements = document.querySelector('.elements');
  let elementTemplate = document.querySelector('#element').content;
  let newElement = elementTemplate.cloneNode(true);
  newElement.querySelector('.element__image').src = img;
  newElement.querySelector('.element__title').textContent = title;
  elements.prepend(newElement);
}

/* Функция отправки формы*/
function submitPopupWindow(evt){
  /*отменяем вносимые стандартные значения*/
  evt.preventDefault();
  console.log('do');
  /*оправка формы карточки*/
  if(evt.target.closest(".popup__element")){
    console.log('target element');
    addElement(popupElemImageInput.value, popupElemTitleInput.value);
  }
  /*отправка формы профиля*/
  else if(evt.target.closest(".popup__profile")){
    console.log('target profile');
    /*приводим значения заголовков в актуальное состояние*/
    profileTitle.textContent = popupNameInput.value ;
    profileSubtitle.textContent = popupSubNameInput.value ;
  }
  /*закрываем все*/
  closePopupWindow(evt);
}

/*вешаем лисенер на кнопки закрытия попапа*/
popupCloseButton.forEach( elem => {elem.addEventListener('click',closePopupWindow)});

/*вешаем лисенер на отправку формы*/
popupForm.forEach(elem=>{elem.addEventListener('submit',submitPopupWindow)});

/*рендер заготовленных карточек*/
initialCards.forEach(elem => addElement(elem.link,elem.name));




