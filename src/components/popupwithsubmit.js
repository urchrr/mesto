import Popup from "./popup.js";
export default class PopupWithSubmit extends Popup {
  constructor(popup, handlerSubmit) {
    super(popup);
    this._handlerSubmit = handlerSubmit;
    this._handlerSubmit = this._handlerSubmit.bind(this);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".popup__submit");
  }

  open(data) {
    this._data = data;
    super.open();
  }

  setSubmitButtonState(state) {
    this._submitButton.textContent = state;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._data);
    });
    super.setEventListeners();
  }
}
