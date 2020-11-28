const popupWindow = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupSubmitButton = document.querySelector('.form__submit');
const popupNameInput = document.querySelector('.form__input_type_name');
const popupSubNameInput = document.querySelector('.form__input_type_subname');
const elementLikeButtons = document.querySelectorAll('.element__like-button');

function togglePopupVisibility(){
  popupWindow.classList.toggle('popup__visible');
};

popupNameInput.value = profileTitle.textContent ;
popupSubNameInput.value = profileSubtitle.textContent ;
popupSubmitButton.addEventListener('click',function(){
  profileTitle.textContent=popupNameInput.value;
  profileSubtitle.textContent=popupSubNameInput.value;
  togglePopupVisibility();
});

popupCloseButton.addEventListener('click',togglePopupVisibility);

profileEditButton.addEventListener('click',togglePopupVisibility);


elementLikeButtons.forEach( function(item){
  item.addEventListener('click',function(){
    item.classList.toggle('element__like-button_active');
    console.log('click');
    })
}

);
