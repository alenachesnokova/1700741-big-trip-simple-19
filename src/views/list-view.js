import {createElement} from '../render.js';

function createLisTemplate() {
  return ('<ul class="trip-events__list"></ul>');
}

export default class ListView {
  getTemplate() {
    return createLisTemplate();
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
