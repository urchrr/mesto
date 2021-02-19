export default class Card {
  constructor(config, { handleImage, handleDelete, handleLike }, api) {
    this._template = document.querySelector(`#${config.element}`).content;
    this._element = config.element
    this._link = config.elementData.link;
    this._name = config.elementData.name;
    this._ownerId = config.elementData.ownerId; //!
    this._userId = config.elementData.userId;//!
    this._likes = config.elementData.likes;//!
    this._id = config.elementData.id;//!
    this._api = api
    this._elementSelectorLikeButtonActive = config.elementLikeButtonActive;
    this._elementSelectorImage = config.elementImage;
    this._elementSelectorTitle = config.elementTitle;
    this._elementSelectorDeleteButton = config.elementDeleteButton;
    this._elementSelectorLikeButton = config.elementLikeButton;
    this._elementSelectorLikeCounter = config.elementLikeCounter
    //внешние хендлеры
    this._handleImage = handleImage;
    this._handleImage = this._handleImage.bind(this);
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    //
    this._currentCard = null;
    this._handleDeleteButton = this._handleDeleteButton.bind(this);
    this._handleLikeButton = this._handleLikeButton.bind(this);
    this._isLiked = this._isLiked.bind(this)
  }
  //проверка постановки лайка
  _isLiked(){
    let a = false
    for (let i=0; i < this._likes.length; i++) {
      if(this._likes[i]._id == this._userId){
        // console.log(this._likes[i]._id == this._userId)
        a = true
      }
    }
    return a
  }
  //обработчики элементов карточки
  _handleLikeButton(evt) {
    this._currentCard = evt.target.closest(`.${this._element}`);
    this._currentButton = evt.target
    console.log(this._currentCard) //.classList.toggle(this._elementSelectorLikeButtonActive);
    if(!this._currentButton.classList.contains(this._elementSelectorLikeButtonActive)){
      this._api.putLike(this._id).then(res =>{
        console.log(res)
        console.log(this._elementSelectorLikeCounter)
        console.log(this._currentCard)
        this._currentCard.querySelector(
          this._elementSelectorLikeCounter
        ).textContent = res.likes.length
        this._currentButton.classList.add(this._elementSelectorLikeButtonActive)
      })
      .catch(err => console.log(err));
    }
    else {
      this._api.deleteLike(this._id).then(res =>{
        console.log(res)
        this._currentCard.querySelector(
          this._elementSelectorLikeCounter
        ).textContent = res.likes.length
        this._currentButton.classList.remove(this._elementSelectorLikeButtonActive)
      })
      .catch(err => console.log(err));
    }
  }

  //колбек на кнопку , выполняет действие удаления карточки
  _handleDeleteButton(evt) {
    this._currentCard = evt.target.closest(`.${this._element}`);
    this._handleDelete(this._id, this._currentCard)
  }

  //обработчики
  _addListeners() {
    if (this._newElementDeleteButton) {
      this._newElementDeleteButton.addEventListener(
        "click",
        this._handleDeleteButton
      );
    }
    this._newElementImage.addEventListener("click", () =>
      this._handleImage({ link: this._link, name: this._name })
    );
    this._newElementLikeButton.addEventListener(
      "click",
      this._handleLikeButton
    );
  }

  //метод который добавляет кнопку удаления
  _addDeleteButton() {
    if (this._userId == this._ownerId) {
      this._newElementDeleteButton = document.createElement("div");
      this._newElementDeleteButton.classList.add(
        this._elementSelectorDeleteButton
      );
      this._newElementDeleteButton.classList.add("page__button");
      // console.log(this._newElementDeleteButton)
      this._newElement
        .querySelector(".element")
        .prepend(this._newElementDeleteButton);
    }
    // console.log('doing del button')
  }

  //функция получения новой карточки
  getElementCard() {
    //склонировали шаблон в новую карточку
    this._newElement = this._template.cloneNode(true);
    //выбираем элементы карточки
    this._newElementImage = this._newElement.querySelector(
      this._elementSelectorImage
    );
    this._newElementTitle = this._newElement.querySelector(
      this._elementSelectorTitle
    );

    this._addDeleteButton();
    this._newElementLikeButton = this._newElement.querySelector(
      this._elementSelectorLikeButton
    );
    this._newElementLikesCounter = this._newElement.querySelector(
      this._elementSelectorLikeCounter
    );
    this._newElementLikesCounter.textContent = this._likes
      ? this._likes.length
      : 0;
    //записываем источник изображения
    this._newElementImage.src = this._link;
    //записываем alt изображения из названия карточки
    this._newElementImage.alt = this._name;
    //записываем название карточки
    this._newElementTitle.textContent = this._name;
    this._addListeners();
    //возвращаем готовую карточку
    if(this._isLiked()){
      this._newElementLikeButton.classList.add(this._elementSelectorLikeButtonActive)
    }

    return this._newElement;
  }
}
