import FiltersView from './views/filters-view';
import { render } from './render';
import ListPresenter from './presenters/list-presenter';

const siteMainElement = document.querySelector('.page-main');
const siteFiltersElement = document.querySelector('.trip-controls');


render(new FiltersView(), siteFiltersElement);

ListPresenter.init();

export {siteMainElement};
