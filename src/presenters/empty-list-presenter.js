import {emptyListTextMap, filterCallbackMap} from '../maps';
import {findKey} from '../utils';
import Presenter from './presenter';

/**
 * @extends Presenter<HTMLParagraphElement>
 */
export default class EmptyListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.pointsModel.addEventListener('add', this.hadlePointsModelAdd.bind(this));
    this.pointsModel.addEventListener('delete', this.hadlePointsModelDelete.bind(this));
    this.pointsModel.addEventListener('update', this.hadlePointsModelUpdate.bind(this));
    this.pointsModel.addEventListener('filter', this.hadlePointsModelFilter.bind(this));

  }

  updateView() {
    const points = this.pointsModel.list();
    const filter = this.pointsModel.getFilter();
    const filterType = findKey(filterCallbackMap, filter);

    this.view.hidden = (this.location.pathname === '/new') || Boolean(points.length);
    this.view.textContent = emptyListTextMap[filterType];

  }

  /**
   * @override
   */
  handleNavigation() {
    this.updateView();
  }

  hadlePointsModelAdd() {
    this.updateView();
  }

  hadlePointsModelDelete() {
    this.updateView();
  }

  hadlePointsModelUpdate() {
    this.updateView();
  }

  hadlePointsModelFilter() {
    this.updateView();
  }
}
