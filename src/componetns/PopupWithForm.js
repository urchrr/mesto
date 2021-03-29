const PopupWithForm = (props) => {
  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_visible' : ''}`}>
      <div className="popup__window">
        <button
          type="button"
          className="popup__close-button page__button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__heading page__font page__font_weight_headings">{props.title}</h2>
        <form
          className="popup__form"
          action="#"
          name={props.name}
          id={props.name}
        >
          {props.children}
          <button
            className="popup__submit page__button page__font page__font_weight_normal"
            type="submit"
            name="submit"
            onClick={props.onSubmit}
          >
            {props.buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
