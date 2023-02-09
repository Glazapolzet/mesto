export default class UserInfo {

  constructor (name, desc) {
    this._name = name;
    this._desc = desc;
  }

  getUserInfo () {
    return {
      name: this._name,
      desc: this._desc
    }
  }

  setUserInfo (name, desc) {
    this._name = name;
    this._desc = desc;
  }

}