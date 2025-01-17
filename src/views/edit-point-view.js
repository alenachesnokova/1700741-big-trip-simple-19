import {createElement} from '../render.js';

function createEditPointTemplate() {
  return ('<ul class="trip-events__list"></ul>');
}

export default class editPointView {
  getTemplate() {
    return createEditPointTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
