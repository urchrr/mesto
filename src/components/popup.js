export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //содержит логику закрытия по оверлею
  _handleClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  //содержит логику закрытия попапа по кнопке esc
  _handleEscClose(evt) {
    //console.log('h esc')
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_visible");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_visible");
  }
  //добавляет слушатель клика икоке закрытия попапа
  setEventListeners() {
    //document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popup.addEventListener("click", (evt) => this._handleClose(evt));
    this._closeButton.addEventListener("click", this.close);
  }
}