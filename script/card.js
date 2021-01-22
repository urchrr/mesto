export class Card {
  constructor(config, handleImage) {
    this._template = document.querySelector(`#${config.element}`).content;
    this._element = config.element;
    this._link = config.link;
    this._name = config.name;
    this._popup = document.querySelector(config.popup);
    this._popupImage = this._popup.querySelector(config.popupImage);
    this._popupFigure = this._popup.querySelector(config.popupFigure);
    this._elementLikeButtonActive = config.elementLikeButtonActive;
    this._elementImage = config.elementImage;
    this._elementTitle = config.elementTitle;
    this._elementDeleteButton = config.elementDeleteButton;
    this._elementLikeButton = config.elementLikeButton;
    this._handleImage = handleImage;
    this._currentCard = null;
  }

  //обработчики элементов карточки
  _handleLikeButton(evt) {
    evt.target.classList.toggle(this._elementLikeButtonActive);
  }

  _handleDeleteButton(evt) {
    this._currentCard = evt.target.closest(`.${this._element}`);
    this._removeListeners();
    this._currentCard.remove();
  }
  _removeListeners() {
    this._currentCard
      .querySelector(this._elementDeleteButton)
      .removeEventListener("click", this._handleDeleteButton);
    this._currentCard
      .querySelector(this._elementImage)
      .removeEventListener("click", this._handleImage);
    this._currentCard
      .querySelector(this._elementLikeButton)
      .removeEventListener("click", this._handleLikeButton);
  }

  //функция получения новой карточки
  getElementCard() {
    console.log(this._element);
    //склонировали шаблон в новую карточку
    const newElement = this._template.cloneNode(true);
    //выбираем элементы карточки
    const elementImage = newElement.querySelector(this._elementImage);
    const elementTitle = newElement.querySelector(this._elementTitle);
    const elementDeleteButton = newElement.querySelector(
      this._elementDeleteButton
    );
    const elementLikeButton = newElement.querySelector(this._elementLikeButton);
    //записываем источник изображения
    elementImage.src = this._link;
    //записываем alt изображения из названия карточки
    elementImage.alt = this._name;
    //записываем название карточки
    elementTitle.textContent = this._name;
    //обработчики
    elementDeleteButton.addEventListener(
      "click",
      this._handleDeleteButton.bind(this)
    );
    //где some_data объект с данными
    elementImage.addEventListener("click", () =>
      this._handleImage({ link: this._link, name: this._name })
    );

    elementLikeButton.addEventListener(
      "click",
      this._handleLikeButton.bind(this)
    );
    //возвращаем готовую карточку
    return newElement;
  }
}
