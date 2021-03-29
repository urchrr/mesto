import { createRef } from "react";
import PopupWithForm from "./PopupWithForm";


const EditAvatarPopup = (props) => {
  const input = createRef()
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: input.current.value,
    });
  }
  return(
<PopupWithForm
          isOpen={props.isOpen}
          onClose={props.onClose}
          name="avatar"
          title="Обновить аватар"
          buttonTitle="Сохранить"
          onSubmit={handleSubmit}
        >
          <fieldset className="popup__fieldset">
            <input
              id="avatar-profile"
              className="popup__input page__font page__font_weight_normal"
              type="url"
              name="avatar"
              required
              placeholder="Ссылка на картинку"
              noValidate
              ref={input}
            />

            <span
              id="avatar-profile-error"
              className="error page__font page__font_weight_normal"
            ></span>
          </fieldset>
        </PopupWithForm>
  )
}

export default EditAvatarPopup;
