class Section {

  constructor ({ items, renderer }, selector) {
    this._itemsToRender = items;
    this._renderer = renderer;

    this._itemsContainer = document.querySelector(selector);
  }

  renderItems () {
    this._itemsToRender.forEach(item => this._renderer(item));
  }

  addItem (element) {
    this._itemsContainer.append(element);
  }

}