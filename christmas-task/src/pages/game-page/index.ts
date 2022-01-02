import Page from '../../core/templates/page';
import GamePanel from './game-panel-block';
import GameSettings from './game-settings-block';
import GameField from './game-field';

import LSKeys from './utils/LSKeys';

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
    this.gameSettings.renderResetButton();

    const savedTreeBgNumber = localStorage.getItem(LSKeys.treeBgNumber);
    if (savedTreeBgNumber)
      this.gameField.renderTreeBackground(+savedTreeBgNumber);
    else this.gameField.renderTreeBackground(defaults.optionNumber);

    const savedTreeNumber = localStorage.getItem(LSKeys.treeNumber);
    if (savedTreeNumber) this.gameField.renderTree(+savedTreeNumber);
    else this.gameField.renderTree(defaults.optionNumber);

    if (localStorage.getItem(LSKeys.snow)) this.gameField.switchSnow(true);
    if (localStorage.getItem(LSKeys.lights)) this.gameField.switchLights(true);

    const savedLightsColor = localStorage.getItem(LSKeys.lightsColor);
    if (savedLightsColor)
      this.gameField.changeLightsColor(savedLightsColor as string);

    this.enableSnowSwitch();
    this.enableLightsSwitch();
    this.enableLightsColorChange();
    this.enableTreeBgChange();
    this.enableTreeChange();
    this.enableResetSettings();

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
      LSKeys.treeNumber
    );
  }

  private enableTreeBgChange() {
    enableImageChange(
      this.gameSettings.bgOptionsBlock,
      this.gameField.bgImage,
      './assets/bg/',
      LSKeys.treeBgNumber
    );
  }

  private enableSnowSwitch() {
    this.gameSettings.snowSwitch.addEventListener('click', () => {
      const isSnowOn = localStorage.getItem(LSKeys.snow);
      if (isSnowOn) {
        this.gameField.switchSnow(false);
        localStorage.removeItem(LSKeys.snow);
      } else {
        this.gameField.switchSnow(true);
        localStorage.setItem(LSKeys.snow, '1');
      }
    });
  }

  private enableLightsSwitch() {
    this.gameSettings.lightsSwitch.addEventListener('click', () => {
      const isLightsOn = localStorage.getItem(LSKeys.lights);
      if (isLightsOn) {
        this.gameField.switchLights(false);
        localStorage.removeItem(LSKeys.lights);
      } else {
        this.gameField.switchLights(true);
        localStorage.setItem(LSKeys.lights, '1');
      }
    });
  }

  private enableLightsColorChange() {
    this.gameSettings.lightsOptionsBlock.childNodes.forEach(
      (option, optionNum) => {
        (option as HTMLElement).addEventListener('click', () => {
          this.gameField.changeLightsColor(lightsColors[optionNum]);
          if (!localStorage.getItem(LSKeys.lights)) {
            this.gameField.switchLights(true);
            this.gameSettings.lightsSwitch.classList.toggle('active-switch');
            localStorage.setItem(LSKeys.lights, '1');
          }
          if (lightsColors[optionNum]) {
            localStorage.setItem(LSKeys.lightsColor, lightsColors[optionNum]);
          } else localStorage.removeItem(LSKeys.lightsColor);
        });
      }
    );
  }

  private enableDragToy(toyCard: HTMLElement, toyImage: HTMLElement) {
    toyImage.addEventListener('dragstart', (event) => {
      const toyIndicator = toyCard.querySelector(
        '.toy-amount-indicator'
      ) as HTMLElement;

      const shiftX = toyImage.getBoundingClientRect().left;
      const shiftY = toyImage.getBoundingClientRect().top;

      const treeShiftX =
        this.gameField.lightsContainer.getBoundingClientRect().left;
      const treeShiftY =
        this.gameField.lightsContainer.getBoundingClientRect().top;

      toyImage.style.position = 'absolute';
      toyImage.style.width = '6vh';

      this.gameField.lightsContainer.append(toyImage);

      const moveAt = (pageX: number, pageY: number) => {
        toyImage.style.left = pageX - shiftX - treeShiftX + 'px';
        toyImage.style.top = pageY - shiftY - treeShiftY + 'px';
      };

      moveAt(event.pageX - treeShiftX, event.pageY - treeShiftY);

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
        toyIndicator.textContent = `${toyCard.querySelectorAll('img').length}`;

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
          toyIndicator.textContent = `${
            toyCard.querySelectorAll('img').length
          }`;
          return;
        }
      });
    });
  }

  private enableDragToys() {
    this.gamePanel.toysBlock.childNodes.forEach((toyCard) => {
      const toys = toyCard.childNodes;
      toys.forEach((toy) => {
        this.enableDragToy(toyCard as HTMLElement, toy as HTMLElement);
      });
    });
  }

  private enableResetSettings() {
    this.gameSettings.resetButton.addEventListener('click', () => {
      localStorage.clear();
      window.dispatchEvent(new HashChangeEvent('hashchange'));
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
