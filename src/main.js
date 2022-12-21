import FiltersView from './views/filters-view';
import { render } from './render';
import ListPresenter from './presenters/list-presenter';
import PointsModel from './models/point-model';


const siteMainElement = document.querySelector('.page-main');
const siteFiltersElement = document.querySelector('.trip-controls');
const siteContentElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const listPresenter = new ListPresenter({
  listContainer: siteContentElement,
  pointsModel,
});

render(new FiltersView(), siteFiltersElement);

listPresenter.init();
console.log(listPresenter.init());
