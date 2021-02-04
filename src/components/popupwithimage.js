import Popup from './popup.js'

export default class PopupWithImage extends Popup{
  constructor(selector){
    super(selector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupFigure = this._popup.querySelector(".popup__figure");
  }

  open({link, name}){
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupFigure.textContent = name;
    super.open()
  }
}
