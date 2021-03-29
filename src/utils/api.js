const handleOriginalResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

class Api {
  constructor(url, headers) {
    this._baseUrl = url;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  setUserInfo(data) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(handleOriginalResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    const method = isLiked ?  "PUT" : "DELETE";
    console.log(method)
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: method,
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  getTheCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  setUserAvatar(data) {
    return fetch(
      this._baseUrl+"/users/me/avatar",
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }
    ).then(handleOriginalResponse);
  }

  createNewCard(data) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(handleOriginalResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }
}

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-20", {
  authorization: "09fc02d2-fbd7-401f-88be-c48180252452",
  "Content-Type": "application/json",
});

export default api;
