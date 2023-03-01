export default class Section {

  constructor ({ items, renderer }, selector) {
    this._itemsToRender = items;
    this._renderer = renderer;

    this._itemsContainer = document.querySelector(selector);
  }

  renderItems() {
    this._itemsToRender.slice().reverse()
      .forEach(item => this._renderer(item));
  }

  prependItem(element) {
    this._itemsContainer.prepend(element);
  }

  appendItem(element) {
    this._itemsContainer.append(element);
  }

}