import {SortType} from '../enums';
import { sortTitleMap, sortCallbackMap, sortDisabilityMap } from '../maps';
import { findKey } from '../utils';
import Presenter from './presenter';


/**
 * @extends {Presenter<SortView>}
 */
export default class SortPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const options = Object.entries(sortTitleMap).map(([value, title]) => ({ title, value }));

    this.view.setOptions(options);
    this.view.setDisability(Object.values(sortDisabilityMap));
    this.view.addEventListener('change', this.handleViewChange.bind(this));

    this.updateViewValue();
    this.updateViewVisibility();

    this.pointsModel.addEventListener('add', this.hadlePointsModelAdd.bind(this));
    this.pointsModel.addEventListener('delete', this.hadlePointsModelDelete.bind(this));
    this.pointsModel.addEventListener('update', this.hadlePointsModelUpdate.bind(this));
    this.pointsModel.addEventListener('filter', this.hadlePointsModelFilter.bind(this));
  }

  updateViewValue() {
    const sort = this.pointsModel.getSort();
    const sortType = findKey(sortCallbackMap, sort);

    this.view.setValue(sortType);
  }

  updateViewVisibility() {
    this.view.hidden = !this.pointsModel.list().length;
  }

  handleViewChange() {
    const sortType = this.view.getValue();

    this.navigate('/');
    this.pointsModel.setSort(sortCallbackMap[sortType]);
  }

  hadlePointsModelAdd() {
    this.updateViewVisibility();
  }

  hadlePointsModelDelete() {
    this.updateViewVisibility();
  }

  hadlePointsModelUpdate() {
    this.updateViewVisibility();
  }

  hadlePointsModelFilter() {
    this.pointsModel.setSort(sortCallbackMap[SortType.DAY], false);
    this.updateViewValue();
    this.updateViewVisibility();
  }
}
