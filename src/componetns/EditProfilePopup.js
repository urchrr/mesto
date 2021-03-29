import { useState , useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const handleChange = (e) => {
    const target = e.target
    target.name == "name" && setName(target.value)
    target.name == "about" && setDescription(target.value)
  };
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          value={name}
          className="popup__input popup__input_type_name page__font page__font_weight_normal"
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          required
          placeholder="Имя"
          autoComplete="off"
          id="name-profile"
          noValidate
          onChange={handleChange}
        />
        <span
          id="name-profile-error"
          className="error page__font page__font_weight_normal"
        ></span>
        <input
          value={description}
          className="popup__input popup__input_type_subname page__font page__font_weight_normal"
          type="text"
          name="about"
          required
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          autoComplete="off"
          noValidate
          onChange={handleChange}
          id="subame-profile"
        />
        <span
          id="subame-profile-error"
          className="error page__font page__font_weight_normal"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
