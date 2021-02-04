import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    //хендлер сабмита формы
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  //собирает данные со всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  //добавляет обработчик иконке закрытия и сабмит формы
  setEventListeners() {
    this._popupForm.addEventListener("submit", () =>
      this._handleSubmit(this._getInputValues())
    );
    super.setEventListeners();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
