import "./index.css";

import * as cs from "../components/constants.js";
import Card from "../components/card.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/popupwithform.js";
import PopupWithImage from "../components/popupwithimage.js";
import PopupWithSubmit from "../components/popupwithsubmit";

cs.formAddElementValidation.enableValidation();
cs.formEditProfileValidation.enableValidation();
cs.formEditAvatarValidation.enableValidation();

cs.api.getUserInfoPromise()
      .then((res) => {
          // console.log(res);
          cs.setUserInfo(res);
        })
      .catch(err => console.log(err));

cs.api.getInitialCardsPromise()
      .then((res) => {
        const popupAdd = new PopupWithForm(".popup_element", handleSubmitAddCard);
        const popupView = new PopupWithImage(".popup_element-view");
        const popupDeleteCard = new PopupWithSubmit(
          ".popup_delete-card",
          handleDeleteSubmitCard
        );
        const section = new Section(
          {
            items: res,
            renderer: function f(item) {
              cs.cardConfig.elementData = {
                link: item.link,
                name: item.name,
                ownerId: item.owner._id,
                userId: cs.userInfo.getUserId(),
                likes: item.likes,
                id: item._id,
              };
              // console.log(cardConfig)
              const cardTT = new Card(
                cs.cardConfig,
                {
                  handleImage: handleCardImage,
                  handleDelete: handlePopupDelete,
                },
                cs.api
              );
              section.addItem(cardTT.getElementCard());
            },
          },
          ".elements"
        );

        function handleCardImage({ link, name }) {
          popupView.open({ link: link, name: name });
        }

        function handleDeleteSubmitCard(data) {
          popupDeleteCard.setSubmitButtonState("Удаляем...");
          cs.api.deleteCard(data.id)
                .then((res) => {
                  console.log(res);
                  data.card.remove();
                })
                .catch(err => console.log(err));
          popupDeleteCard.close();
          popupDeleteCard.setSubmitButtonState("Да");
        }

        function handlePopupDelete(id, card) {
          popupDeleteCard.open({ id: id, card: card });
        }

        function handleSubmitAddCard(data) {
          cs.api
            .addNewCardPromise({ name: data.element_title, link: data.element_photo })
            .then((res) => {
              cs.cardConfig.elementData = {
                link: res.link,
                name: res.name,
                ownerId: res.owner._id,
                userId: cs.userInfo.getUserId(),
                likes: res.likes,
                createdAt: res.createdAt,
              };
              console.log(cs.cardConfig.elementData);
              const newCard = new Card(
                cs.cardConfig,
                {
                  handleImage: handleCardImage,
                  handleDelete: handlePopupDelete,
                },
                cs.api
              );
              section.addItem(newCard.getElementCard());
              popupAdd.close();
            })
            .catch(err => console.log(err));
        }

        function handleAddCard() {
          cs.formAddElementValidation.hideErrors();
          cs.formAddElementValidation.setButtonState();
          popupAdd.open();
        }

        cs.startPage();
        cs.profileAddElementButton.addEventListener("click", handleAddCard);
        popupDeleteCard.setEventListeners();
        popupAdd.setEventListeners();
        popupView.setEventListeners();
        section.render();
      })
      .catch(err => console.log(err));
