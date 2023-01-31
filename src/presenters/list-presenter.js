import { pointIconMap, pointTitleMap } from '../maps';
import { formatDate, formatNumber, formatTime } from '../utils';
import Presenter from './presenter';

/**
 * @extends {Presenter<ListView>}
 */
export default class ListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.updateView();

    this.view.addEventListener('edit', this.handleViewEdit.bind(this));
    this.pointsModel.addEventListener('filter', this.handlePointsModelFilter.bind(this));
    this.pointsModel.addEventListener('sort', this.handlePointsModelSort.bind(this));
    this.pointsModel.addEventListener('add', this.handlePointsModeAdd.bind(this));
    this.pointsModel.addEventListener('update', this.handlePointsModeUpdate.bind(this));
    this.pointsModel.addEventListener('delete', this.handlePointDelete.bind(this));
  }

  /**
   * @param {PointAdapter} [targetPoint]
   */
  updateView(targetPoint) {
    const points = this.pointsModel.list();
    const pointViewStates = points.map(this.createPointViewState, this);
    const pointViews = this.view.setItems(pointViewStates);

    if (targetPoint) {
      this.view.findById(targetPoint.id)?.fadeInLeft();
    } else {
      pointViews.forEach((pointView, index) => {
        pointView.fadeInLeft({delay: 100 * index});
      });
    }
  }

  /**
   * @param {PointAdapter} point
   */
  createPointViewState(point) {
    const destination = this.destinationsModel.findById(point.destinationId);
    const offerGroup = this.offerGroupsModel.findById(point.type);

    const offerViewStates = offerGroup.items
      .filter((offer) =>
        point.offerIds.includes(offer.id)
      )
      .map((offer) => ({
        title: offer.title,
        price: formatNumber(offer.price)
      }));

    return {
      id: point.id,
      date: formatDate(point.startDate),
      icon: pointIconMap[point.type],
      title: `${pointTitleMap[point.type]} ${destination.name}`,
      offers: offerViewStates,
      startDate: point.startDate,
      startTime: formatTime(point.startDate),
      endDate: (point.endDate),
      endTime: formatTime(point.endDate),
      basePrice: formatNumber(point.basePrice)
    };
  }

  /**
   * @param {CustomEvent & {target: PointView}} event
   */
  handleViewEdit(event) {
    this.navigate('/edit', event.target.dataset);
  }

  handlePointsModelFilter() {
    this.updateView();
  }

  handlePointsModelSort() {
    this.updateView();
  }

  /**
   * @param {CustomEvent<PointAdapter>} event
   */
  handlePointsModeAdd(event) {
    this.updateView(event.detail);
  }

  /**
   * @param {CustomEvent<PointAdapter>} event
   */
  handlePointDelete(event) {
    this.updateView(event.detail);
  }

  /**
   * @param {CustomEvent<{newItem: PointAdapter}>} event
   */
  handlePointsModeUpdate(event) {
    this.updateView(event.detail.newItem);
  }
}
