function handlePopupClose(evt) {
  if (evt.target === evt.currentTarget) {
    closePopupWindow(evt.currentTarget);
  }
}

function handlePopupEscape(evt) {
  if (evt.key === "Escape") {
    closePopupWindow(document.querySelector('.popup_visible'));
  }
}
//функция открытия попапа
export function openPopupWindow(popup) {
  popup.addEventListener("click", handlePopupClose);
  document.addEventListener("keydown", handlePopupEscape);
  popup.classList.add("popup_visible");
}
//функция закрытия попапа
export function closePopupWindow(popup) {
  popup.removeEventListener("click", handlePopupClose);
  document.removeEventListener("keydown", handlePopupEscape);
  popup.classList.remove("popup_visible");
}
