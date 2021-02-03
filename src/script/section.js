export default class Section {
  constructor({ items, renderer }, containerSelector) {
    //items - массив данных которые нужно добавить на страницу при инициализации класса
    this._items = items;
    //renderer - отвечает за создание и отрисовку данныз на странице
    this._renderer = renderer;
    //контейнер - то куда стоит отрисовывать
    this._container = document.querySelector(containerSelector);
  }

  addItem(card) {
    this._container.prepend(card);
  }
  //это будет рисовать на странице блок с карточками
  render() {
    this._items.forEach((item) => this._renderer(item));
  }
}
