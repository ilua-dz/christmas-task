import './snow.css';

import Component from '../../../core/templates/component';

class GameField extends Component {
  public treeImage!: HTMLImageElement;
  public bgImage!: HTMLImageElement;
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderTreeBackground(bgNumber: number) {
    this.bgImage = document.createElement('img');
    this.bgImage.className = 'tree-bg';
    this.bgImage.src = `./assets/bg/${bgNumber}.webp`;

    this.container.append(this.bgImage);
  }

  renderTree(treeNumber: number) {
    this.treeImage = document.createElement('img');
    this.treeImage.className = 'tree-image';
    this.treeImage.src = `./assets/tree/${treeNumber}.webp`;

    this.container.append(this.treeImage);
  }

  switchSnow(direction: boolean) {
    if (direction) {
      const snowArea = document.createElement('div');
      snowArea.className = 'snowflakes';
      for (let i = 0; i < 125; i++)
        snowArea.append(document.createElement('i'));

      this.container.append(snowArea);
    } else this.container.querySelector('.snowflakes')?.remove();
  }
}

export default GameField;
