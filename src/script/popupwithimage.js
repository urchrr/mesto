import Popup from './popup.js'

export default class PopupWithImage extends Popup{
  constructor(selector){
    super(selector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupFigure = this._popup.querySelector(".popup__figure");
  }

  open(imageData){
    this._popupImage.src = imageData.link;
    this._popupImage.alt = imageData.name;
    this._popupFigure.textContent = imageData.name;
    super.open()
  }
}
