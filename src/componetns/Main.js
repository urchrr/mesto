import {useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);


  return (
    <>
      <section className="profile page__section">
        <div className="profile__wrapper">
          <a
            className="profile__photo-edit"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></a>
          <div className="profile__info">
            <div className="profile__info-wrapper">
              <h1 className="profile__title page__font page__font_weight_bold page__text-overflow">
                {currentUser.name}
              </h1>
              <button
                className="profile__edit-button page__button"
                type="button"
                aria-label="Редактирование профиля"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle page__font page__font_weight_normal page__text-overflow">
              {currentUser.about}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-element-button page__button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements page__section">
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                onCardClick={props.onCardClick}
                card={card}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </section>

    </>
  );
};

export default Main;
