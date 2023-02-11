export default class UserInfo {

  constructor (nameSelector, descSelector) {
    this._name = nameSelector;
    this._desc = descSelector;
  }

  getUserInfo () {
    return {
      name: this._name.textContent,
      desc: this._desc.textContent
    }
  }

  setUserInfo (name, desc) {
    this._name.textContent = name;
    this._desc.textContent = desc;
  }

}