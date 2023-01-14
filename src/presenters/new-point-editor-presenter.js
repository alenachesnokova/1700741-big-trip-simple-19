import { PointType } from '../enums';
import { pointTitleMap } from '../maps';
import { formatNumber } from '../utils';
import Presenter from './presenter';

/**
 * @extends {Presenter<NewPointEditorView>}
 */
export default class NewPointEditorPresenter extends Presenter {
  constructor() {
    super(...arguments);

    /** Сделан объхект из объектов  типа title: 'Taxi', value: 'taxi'  */

    const pointTypeOptions =
      Object.entries(pointTitleMap).map(([value, title]) => ({title, value}));

    /** Сделали список транспорта и сформировали из него список в поле выбора транспорта*/
    this.view.pointTypeView.setOptions(pointTypeOptions);

    /**Добавили слушатель на изменения вьюшки типа кнопки*/
    this.view.pointTypeView.addEventListener('change', this.handlePointTypeViewChange.bind(this));

    /** Установили значение по умолчанию */
    this.view.pointTypeView.setValue(PointType.BUS);

    /** Cоставили список пунктов назначения */

    const destinationOptions =
      this.destinationsModel.listAll().map((item) => ({title: '', value: item.name}));

    //** Составили список ??????*/
    this.view.destinationView.setOptions(destinationOptions);

    this.view.destinationView.addEventListener('input', this.handleDestinationViewInput.bind(this));

    this.view.addEventListener('submit', this.handleViewSubmit.bind(this));
    this.view.addEventListener('reset', this.handleViewReset.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
  }

  /**
   *
   * @param {PointAdapter} point
   */
  updateView(point) {
    const destination = this.destinationsModel.findById(point.destinationId);

    this.view.pointTypeView.setValue(point.type);
    this.view.destinationView.setLabel(pointTitleMap[point.type]);
    this.view.destinationView.setValue(destination.name);
    this.updateOffersView(point.offerIds);
    this.updateDestinationDetailsView(destination);
  }

  /**
   *
   * @param {string[]} offerIds
   */
  updateOffersView(offerIds = []) {
    /** TODO перерисовка офера */
    const pointType = this.view.pointTypeView.getValue();
    const offerGroup = this.offerGroupsModel.findById(pointType);
    const options = offerGroup.items.map((offer) => ({
      ...offer,
      price: formatNumber(offer.price),
      checked: offerIds.includes(offer.id)
    }));

    this.view.offersView.setOptions(options);
    this.view.offersView.hidden = !options.length;
    /** ADD 12/14 */

  }

  /**
 * @param {DestinationAdapter} [destination]
 */
  updateDestinationDetailsView(destination) {
    this.view.destinationDetailsView.hidden = !destination;

    if (destination) {
      this.view.destinationView.setContent(destination);
    }
  }

  /**
   * @override
   */
  handleNavigation() {
    if (this.location.pathname === '/new') {

      const point = this.pointsModel.item();

      point.type = PointType.FLIGHT;
      point.destinationId = this.destinationsModel.item(0).id;
      point.startDate = (new Date()).toJSON();
      point.endDate = point.startDate;
      point.basePrice = 100;
      point.offerIds = ['1', '2', '3'];

      this.view.open();
      this.updateView(point);
    }
    else {
      this.view.close(false);
    }
  }

  /**
   * @param {SubmitEvent} event
   */
  handleViewSubmit(event) {
    event.preventDefault();
  }

  handleViewReset() {
    this.view.close();
  }

  handleViewClose() {
    this.navigate('/');
  }

  handlePointTypeViewChange() {
    const pointType = this.view.pointTypeView.getValue();

    this.view.destinationView.setLabel(pointTitleMap[pointType]);

    this.updateOffersView();
  }

  handleDestinationViewInput() {
    const destinationName = this.view.destinationView.getValue();
    const destination = this.destinationsModel.findBy('name', destinationName);

    this.updateDestinationDetailsView(destination);
  }

}
