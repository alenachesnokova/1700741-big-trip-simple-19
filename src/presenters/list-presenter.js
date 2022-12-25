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
    this.pointsModel.addEventListener('filter', this.handlePointsModelFilter.bind(this));

  }

  updateView() {
    this.view.setItems(
      this.pointsModel.list().map(this.createPointViewState, this)
    );
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

  handlePointsModelFilter() {
    this.updateView();
  }
}


