import ListView from '../views/list-view';
import NewPointEditorView from '../views/new-point-editor-view';
import PointView from '../views/point-view';
import SortingView from '../views/sorting-view';
import { render } from '../render';

export default class ListPresenter {
  listComponent = new ListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.listComponent, this.listContainer);
    render(new SortingView, this.listComponent.getElement());
    render(new NewPointEditorView, this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView, this.listComponent.getElement());
    }
  }
}
