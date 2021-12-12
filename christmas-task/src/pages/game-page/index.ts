import Page from '../../core/templates/page';

class GamePage extends Page {
  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createTitle(Page.titlesObject.gamePage);
    this.container.append(title);
    return this.container;
  }
}

export default GamePage;
