import Page from '../../core/templates/page';

class ToysPage extends Page {
  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createTitle(Page.titlesObject.toysPage);
    this.container.append(title);
    return this.container;
  }
}

export default ToysPage;
