/*обработчик слушателя страницы*/
document.querySelector('.page').addEventListener('click',elementListener);
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
      document.querySelector('.popup_element').classList.add('popup_visible');
    }
    /* кнопка редактирования профиля*/
    else if (tar.classList.contains('profile__edit-button')){
      console.log('tar edit profile');
      /*приводим значения полей ввода профиля в актуальное состояние*/
      popupNameInput.value = profileTitle.textContent ;
      popupSubNameInput.value = profileSubtitle.textContent;
      /* добавление модификатора отображения попапа*/
      document.querySelector('.popup_profile').classList.add('popup_visible');
    }
  }