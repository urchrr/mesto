export default class Card {
  constructor(config, handleImage) {
    this._template = document.querySelector(`#${config.element}`).content;
    this._element = config.element;
    this._link = config.link;
    this._name = config.name;

    this._elementSelectorLikeButtonActive = config.elementLikeButtonActive;
    this._elementSelectorImage = config.elementImage;
    this._elementSelectorTitle = config.elementTitle;
    this._elementSelectorDeleteButton = config.elementDeleteButton;
    this._elementSelectorLikeButton = config.elementLikeButton;
    this._handleImage = handleImage;
    this._handleImage = this._handleImage.bind(this)
    this._currentCard = null;

    this._handleDeleteButton = this._handleDeleteButton.bind(this);
    this._handleLikeButton = this._handleLikeButton.bind(this);
  }

  //обработчики элементов карточки
  _handleLikeButton(evt) {
    evt.target.classList.toggle(this._elementSelectorLikeButtonActive);
  }

  _handleDeleteButton(evt) {
    this._currentCard = evt.target.closest(`.${this._element}`);
    //удаляет карточку вместе с обработчиками
    this._currentCard.remove();
  }

  //обработчики
  _addListeners() {
    this._newElementDeleteButton.addEventListener(
      "click",
      this._handleDeleteButton
    );
    this._newElementImage.addEventListener("click", () =>
      this._handleImage({ link: this._link, name: this._name }));
    this._newElementLikeButton.addEventListener(
      "click",
      this._handleLikeButton
    );
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
    this._newElementDeleteButton = this._newElement.querySelector(
      this._elementSelectorDeleteButton
    );
    this._newElementLikeButton = this._newElement.querySelector(
      this._elementSelectorLikeButton
    );
    //записываем источник изображения
    this._newElementImage.src = this._link;
    //записываем alt изображения из названия карточки
    this._newElementImage.alt = this._name;
    //записываем название карточки
    this._newElementTitle.textContent = this._name;

    this._addListeners();
    //возвращаем готовую карточку
    return this._newElement;
  }
}
