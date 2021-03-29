import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button page__button ${
    isLiked && "element__like-button_active"
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleClick() {
    props.onCardClick({ link: props.card.link, name: props.card.name });
  }
  return (
    <article className="element">
      {isOwn && <button className="element__delete-button page__button" onClick={handleDeleteClick}/>}
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title page__font page__font_weight_headings page__text-overflow">
          {props.card.name}
        </h2>
        <div>
          <>
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}
            ></button>
            <p className="element__like page__font page__font_weight_normal">
              {props.card.likes.length}
            </p>
          </>
        </div>
      </div>
    </article>
  );
};

export default Card;
