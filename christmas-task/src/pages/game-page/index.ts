import Page from '../../core/templates/page';
import GamePanel from './game-panel-block';
import GameSettings from './game-settings-block';
import GameField from './game-field';

export enum defaults {
  optionNumber = 1,
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
    else this.gameField.renderTreeBackground(defaults.optionNumber);

    const savedTreeNumber = localStorage.getItem('treeNumber');
    if (savedTreeNumber) this.gameField.renderTree(+savedTreeNumber);
    else this.gameField.renderTree(defaults.optionNumber);

    if (localStorage.getItem('snow')) this.gameField.switchSnow(true);
    if (localStorage.getItem('lights')) this.gameField.switchLights(true);

    const savedLightsColor = localStorage.getItem('lightsColor');
    if (savedLightsColor)
      this.gameField.changeLightsColor(savedLightsColor as string);

    this.enableSnowSwitch();
    this.enableLightsSwitch();
    this.enableLightsColorChange();
    this.enableTreeBgChange();
    this.enableTreeChange();

    this.gamePanel.renderToysBlock();

    this.container.append(
      this.gameSettings.render(),
      this.gameField.render(),
      this.gamePanel.render()
    );

    this.enableDragToys();

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

  private enableSnowSwitch() {
    this.gameSettings.snowSwitch.addEventListener('click', () => {
      const isSnowOn = localStorage.getItem('snow');
      if (isSnowOn) {
        this.gameField.switchSnow(false);
        localStorage.removeItem('snow');
      } else {
        this.gameField.switchSnow(true);
        localStorage.setItem('snow', '1');
      }
    });
  }

  private enableLightsSwitch() {
    this.gameSettings.lightsSwitch.addEventListener('click', () => {
      const isLightsOn = localStorage.getItem('lights');
      if (isLightsOn) {
        this.gameField.switchLights(false);
        localStorage.removeItem('lights');
      } else {
        this.gameField.switchLights(true);
        localStorage.setItem('lights', '1');
      }
    });
  }

  private enableLightsColorChange() {
    this.gameSettings.lightsOptionsBlock.childNodes.forEach(
      (option, optionNum) => {
        (option as HTMLElement).addEventListener('click', () => {
          this.gameField.changeLightsColor(lightsColors[optionNum]);
          if (!localStorage.getItem('lights')) {
            this.gameField.switchLights(true);
            this.gameSettings.lightsSwitch.classList.toggle('active-switch');
            localStorage.setItem('lights', '1');
          }
          if (lightsColors[optionNum]) {
            localStorage.setItem('lightsColor', lightsColors[optionNum]);
          } else localStorage.removeItem('lightsColor');
        });
      }
    );
  }

  private enableDragToy(toyCard: HTMLElement, toyImage: HTMLElement) {
    toyImage.addEventListener('dragstart', (event) => {
      const shiftX = toyImage.getBoundingClientRect().left;
      const shiftY = toyImage.getBoundingClientRect().top;

      toyImage.style.position = 'absolute';
      toyImage.style.width = '3vw';

      document.body.append(toyImage);

      const moveAt = (pageX: number, pageY: number) => {
        toyImage.style.left = pageX - shiftX + 'px';
        toyImage.style.top = pageY - shiftY + 'px';
      };

      moveAt(event.pageX, event.pageY);

      const onMouseMove = (event: MouseEvent) => {
        moveAt(
          event.pageX + shiftX - toyImage.offsetWidth / 2,
          event.pageY + shiftY - toyImage.offsetHeight / 2
        );
      };

      document.addEventListener('mousemove', onMouseMove);

      toyImage.addEventListener('mouseup', (event) => {
        document.removeEventListener('mousemove', onMouseMove);
        toyImage.hidden = true;
        this.enableDragToy(toyCard, toyImage);
        if (
          document.elementFromPoint(event.clientX, event.clientY)?.tagName ===
          'AREA'
        ) {
          toyImage.hidden = false;
          toyImage.onmouseup = null;
        } else {
          toyImage.hidden = false;
          toyImage.removeAttribute('style');
          toyCard.append(toyImage);

          return;
        }
      });
    });

    toyImage.ondragstart = () => false;
  }

  private enableDragToys() {
    this.gamePanel.toysBlock.childNodes.forEach((toyCard) => {
      const toys = toyCard.childNodes;
      toys.forEach((toy) => {
        this.enableDragToy(toyCard as HTMLElement, toy as HTMLElement);
      });
    });
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

const lightsColors = [
  '',
  'var(--neon-red-color)',
  'var(--neon-yellow-color)',
  'var(--neon-green-color)',
  'var(--neon-blue-color)',
];

export default GamePage;
