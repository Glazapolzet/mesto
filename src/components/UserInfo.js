export default class UserInfo {

  constructor(nameSelector, descSelector, personalId) {
    this._name = nameSelector;
    this._desc = descSelector;
    this._personalId = personalId;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      desc: this._desc.textContent
    }
  }

  setUserInfo(name, desc) {
    this._name.textContent = name;
    this._desc.textContent = desc;
  }

  getPersonalId() {
    return this._personalId;
  }

}