export default class UserInfo {

  constructor(nameSelector, descSelector) {
    this._name = nameSelector;
    this._desc = descSelector;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      desc: this._desc.textContent
    }
  }

  setUserInfo({ name, about, _id }) {
    if(name && about && _id) {
      this._name.textContent = name;
      this._desc.textContent = about;
      this._personalId = _id;
    }
  }

  getPersonalId() {
    return this._personalId;
  }

}