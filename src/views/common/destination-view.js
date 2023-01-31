import View from '../views';
import {html} from '../../utils';

export default class DestinationView extends View {
  constructor() {
    super();

    this.classList.add('event__field-group', 'event__field-group--destination');
  }

  /**
   * @override
   * Сделали разметку для блока Дестинэшн
   */
  createHtml() {
    return html`
      <label class="event__label  event__type-output" for="event-destination-1"></label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" list="destination-list-1">
      <datalist id="destination-list-1"></datalist>
    `;
  }

  /**
   * @param {OptionViewState} state
   * Добавили разметку разные города назначения
   */
  createOptionHtml(state) {
    return html`
      <option value="${state.value}">${state.title}</option>
    `;
  }

  /**
   * @param {Picture} state
   * сделали разметку для каждой картинки пункта назначения
   */
  createPictureHtml(state) {
    return html`
      <img
        class="event__photo"
        src="${state.src}"
        alt="${state.description}">
    `;
  }

  /**
   * @param {DestinationAdapter} state
   * Добавили разметку разные картинки к пункту назначения
   */
  setContent(state) {
    const picturesHtml = state.pictures.map(this.createPictureHtml).join('');

    this.querySelector('.event__photos-tape').innerHTML = picturesHtml;
    this.querySelector('.event__destination-description').textContent = state.description;
  }

  /**
   * @param {OptionViewState[]} states
   * Соединили все города в список и добавили в выбор городов
   */
  setOptions(states) {
    const optionsHtml = states.map(this.createOptionHtml).join('');
    this.querySelector('datalist'). insertAdjacentHTML('beforeend', optionsHtml);
  }

  /**
   * Передаем название города
   * @param {String} value
   */
  setValue(value) {
    this.querySelector('input').value = value;
  }

  /**
   * Возвращаем название города
   * @returns {String}
   */
  getValue() {
    return this.querySelector('input').value;
  }


  /**
  * Текстовое содержимое типа транспорта около названия города
  * @param {string} label
  */

  setLabel(label) {
    this.querySelector('label').textContent = label;
  }


}

customElements.define(String(DestinationView), DestinationView);
