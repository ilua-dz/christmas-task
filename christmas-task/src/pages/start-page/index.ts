import Page from '../../core/templates/page';

class StartPage extends Page {
  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createTitle(Page.titlesObject.startPage);
    const message = document.createElement('h2');
    message.classList.add('message');
    this.container.append(title);
    return this.container;
  }
}

export default StartPage;
