const ImagePopup = (props) => {
  return (
    <div
      className={`popup popup_element-view ${
        props.isOpen ? "popup_visible" : ""
      }`}
    >
      <figure className="popup__wrapper">
        <button
          type="button"
          className="popup__close-button page__button"
          onClick={props.onClose}
        ></button>
        <img className="popup__image" src={props.card.link} alt="Изображение" />
        <figcaption className="popup__figure page__font page__font_weight_normal">
          {props.card.name}
        </figcaption>
      </figure>
    </div>
  );
};

export default ImagePopup;
