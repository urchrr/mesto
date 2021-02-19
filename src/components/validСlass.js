export default class Validate {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
    this._inputsList = this._form.querySelectorAll(config.inputSelector);
    this._buttonInvalidClass = config.buttonInvalidClass;
    this._inputInvalidClass = config._inputInvalidClass;
  }
  //показать ошибку
  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputInvalidClass);
  }
  //скрыть ощибку
  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._inputInvalidClass);
  }
  //триггер валидации инпута
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }
  //функция проверки состояния сабмита
  setButtonState() {
    if (this._form.checkValidity()) {
      this._submitButton.classList.remove(this._buttonInvalidClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._buttonInvalidClass);
      this._submitButton.disabled = true;
    }
  }
  reset(){
    this._form.reset();
  }

  hideErrors(){
    this._inputsList.forEach((input) => {
      this._hideError(input);
  });
  }
  checkForm(){
    this._inputsList.forEach((input) => {
        this._checkInputValidity(input);
    });
  }
  //функция добавления слушателей на каждый элемент формы
  _setEventListeners() {
    this._inputsList.forEach((input) => {
      input.addEventListener("input", () => {
        // console.log(input.validity)
        this._checkInputValidity(input);
        this.setButtonState();
      });
    });
  }
  //запуск валидации
  enableValidation() {
    this._setEventListeners();
    //setEventListeners(form, this._config);
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.setButtonState();
  }
}
//параметры
