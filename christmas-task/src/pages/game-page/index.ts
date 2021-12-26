import Page from '../../core/templates/page';
import GamePanel from './game-panel-block';
import GameSettings from './game-settings-block';
import GameField from './game-field';
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

    this.gameField.renderTreeBackground(1);

    this.gamePanel.renderToysBlock();
    this.gamePanel.renderDecoratedTreesBlock();

    this.container.append(
      this.gameSettings.render(),
      this.gameField.render(),
      this.gamePanel.render()
    );

    return this.container;
  }
}

export default GamePage;
