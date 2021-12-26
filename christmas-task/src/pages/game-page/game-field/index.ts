import Component from '../../../core/templates/component';

class GameField extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderTreeBackground(bgNumber: number) {
    const bgImage = document.createElement('img');
    bgImage.className = 'tree-bg';
    bgImage.src = `./assets/bg/${bgNumber}.webp`;

    this.container.append(bgImage);
  }
}

export default GameField;
