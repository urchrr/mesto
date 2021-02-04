export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      profile_name: this._userName.textContent,
      profile_subname: this._userInfo.textContent,
    };
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.profile_name;
    this._userInfo.textContent = data.profile_subname;
  }
}
