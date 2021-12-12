import Page from '../../core/templates/page';

class StartPage extends Page {
  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createTitle(Page.titlesObject.startPage);
    this.container.append(title);
    return this.container;
  }
}

export default StartPage;
