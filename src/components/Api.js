export default class Api {

  constructor (options) {
    this._baseURL = options['baseURL'];
    this._headers = options['headers'];
    this._token = options['headers']['authorization'];
  }

  _handlePromise(res) {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handlePromise(res))
  }

  //PUT DELETE
  updateLike(cardId, method, handler) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handlePromise(res))
      .then(data => handler(data))
      .catch(err => console.log(err))
  }

  getUserData() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handlePromise(res))
  }

  editProfile(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  editAvatar(link) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
  }

  postCard(name, link) {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._handlePromise(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
  }

}