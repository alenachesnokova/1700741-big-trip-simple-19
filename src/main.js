import FiltersView from './views/filters-view';
import { render } from './render';
import ListPresenter from './presenters/list-presenter';

const siteMainElement = document.querySelector('.page-main');
const siteFiltersElement = document.querySelector('.trip-controls');
const siteContentElement = siteMainElement.querySelector('.trip-events');
const listPresenter = new ListPresenter({listContainer: siteContentElement});

render(new FiltersView(), siteFiltersElement);

listPresenter.init();
