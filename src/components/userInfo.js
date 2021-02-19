export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector}) {
    this._userNameDOM = document.querySelector(userNameSelector);
    this._userAboutDOM = document.querySelector(userInfoSelector);
    this._userId = null;
    this._userAvatarDOM = document.querySelector(userAvatarSelector);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userNameDOM.textContent,
      about: this._userAboutDOM.textContent,
    };
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({userName, userAbout}) {
    this._userNameDOM.textContent = userName;
    this._userAboutDOM.textContent = userAbout;
  }
  setUserId(id){
    this._userId = id
  }
  getUserId(){
    return this._userId
  }
  setUserAvatar(src){
    this._userAvatarDOM.src = src
  }
  getUserAvatar(){
    return this._userAvatarDOM
  }
}
