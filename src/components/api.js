export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  getUserInfoPromise(){
    return fetch(this._baseUrl+'/users/me',{
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  getUserInfo = (callback) =>{
    return fetch(this._baseUrl+'/users/me',{
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(res => callback(res))
    .catch(err => console.log(err));
  }

  getInitialCardsPromise() {
    return fetch(this._baseUrl+'/cards', {
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      });
  }

  addNewCardPromise({name , link}){
    return fetch(this._baseUrl+'/cards',{
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  setAvatarPromise(src){
    return fetch(this._baseUrl+'/users/me/avatar',{
      method: "PATCH",
      headers: this._headers,
      // body: JSON.stringify({avatar: 'src'})
      body: JSON.stringify(src)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
  }

  setUserInfo(src){
    return fetch(this._baseUrl+'/users/me',{
      method: "PATCH",
      headers: this._headers,
      // body: JSON.stringify({avatar: 'src'})
      body: JSON.stringify(src)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
  }

  deleteCard(id){
    console.log(`deleting ${id}`)
    return fetch(`${this._baseUrl}/cards/${id}`,{
      method: "DELETE",
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('сервер не доступен')
    })
  }
  putLike(id){
    return fetch(`${this._baseUrl}/cards/likes/${id}`,{
      method: "PUT",
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('сервер не доступен')
    })
  }
  deleteLike(id){
    return fetch(`${this._baseUrl}/cards/likes/${id}`,{
      method: "DELETE",
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('сервер не доступен')
    })
  }
  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '09fc02d2-fbd7-401f-88be-c48180252452',
    'Content-Type': 'application/json'
  }
});
