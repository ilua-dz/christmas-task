import Page from '../../core/templates/page';
import GamePanel from './game-panel-block';
import GameSettings from './game-settings-block';
import GameField from './game-field';

enum defaults {
  treeNumber = 1,
  treeBgNumber = 1,
}
class GamePage extends Page {
  public gameSettings: GameSettings;
  private gamePanel: GamePanel;
  private gameField: GameField;
  constructor(id: string) {
    super(id);
    this.gameSettings = new GameSettings('div', 'game-settings');
    this.gamePanel = new GamePanel('div', 'game-panel');
    this.gameField = new GameField('div', 'tree-container');
  }

  render() {
    this.gameSettings.renderSwitches();
    this.gameSettings.renderTreeOptions();
    this.gameSettings.renderBgOptions();
    this.gameSettings.renderLightsOptions();

    const savedTreeBgNumber = localStorage.getItem('treeBgNumber');
    if (savedTreeBgNumber)
      this.gameField.renderTreeBackground(+savedTreeBgNumber);
    else this.gameField.renderTreeBackground(defaults.treeBgNumber);

    const savedTreeNumber = localStorage.getItem('treeNumber');
    if (savedTreeNumber) this.gameField.renderTree(+savedTreeNumber);
    else this.gameField.renderTree(defaults.treeNumber);

    this.enableTreeBgChange();
    this.enableTreeChange();

    this.gamePanel.renderToysBlock();
    this.gamePanel.renderDecoratedTreesBlock();

    this.container.append(
      this.gameSettings.render(),
      this.gameField.render(),
      this.gamePanel.render()
    );

    return this.container;
  }

  private enableTreeChange() {
    enableImageChange(
      this.gameSettings.treeOptionsBlock,
      this.gameField.treeImage,
      './assets/tree/',
      'treeNumber'
    );
  }

  private enableTreeBgChange() {
    enableImageChange(
      this.gameSettings.bgOptionsBlock,
      this.gameField.bgImage,
      './assets/bg/',
      'treeBgNumber'
    );
  }
}

const enableImageChange = (
  optionsBlock: HTMLElement,
  imageNode: HTMLImageElement,
  imgPath: string,
  localStorageKey: string
) => {
  optionsBlock.childNodes.forEach((btn, optionNumber) => {
    const realOptionNumber = optionNumber + 1;
    btn.addEventListener('click', () => {
      imageNode.src = imgPath + realOptionNumber + '.webp';
      localStorage.setItem(localStorageKey, `${realOptionNumber}`);
    });
  });
};

export default GamePage;
