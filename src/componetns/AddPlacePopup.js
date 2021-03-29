import { createRef } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const nameCard = createRef();
  const linkCard = createRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: nameCard.current.value,
      link: linkCard.current.value
    });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="element"
      title="Новое место"
      buttonTitle="Создать"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          id="name-card"
          className="popup__input popup__input_type_elem-title page__font page__font_weight_normal"
          type="text"
          name="element_title"
          minLength="2"
          maxLength="30"
          required
          placeholder="Название"
          autoComplete="off"
          noValidate
          ref={nameCard}
        />
        <span
          id="name-card-error"
          className="error page__font page__font_weight_normal"
        ></span>
        <input
          id="url-card"
          className="popup__input popup__input_type_elem-image page__font page__font_weight_normal"
          type="url"
          name="element_photo"
          required
          placeholder="Ссылка на картинку"
          noValidate
          ref={linkCard}
        />
        <span
          id="url-card-error"
          className="error page__font page__font_weight_normal"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
