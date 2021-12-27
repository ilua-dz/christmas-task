import { defaults } from '..';
import Component from '../../../core/templates/component';

const renderSwitch = (className: string, localStorageKey: string) => {
  const switchHTML = document.createElement('i');
  switchHTML.className = 'fa-thin ' + className;
  if (localStorage.getItem(localStorageKey))
    switchHTML.classList.add('active-switch');
  switchHTML.addEventListener('click', () => {
    switchHTML.classList.toggle('active-switch');
  });
  return switchHTML;
};

export const renderGameSettingsBlock = (...elements: HTMLElement[]) => {
  const block = document.createElement('div');
  block.className = 'game-settings-block';
  block.append(...elements);
  return block;
};

const treeOptionsNumber = 4;
const bgOptionsNumber = 8;

const enableHighlightOption = (option: HTMLElement) => {
  option.addEventListener('click', () => {
    option.parentElement?.childNodes.forEach((_option) => {
      (_option as HTMLElement).classList.remove('active-option');
    });
    option.classList.add('active-option');
  });
};

export const getOptionsSet = (
  optionsNumber: number,
  imgPath: string,
  optionClassName: string,
  localStorageKey?: string,
  enableHighlight = true
) => {
  const optionImgLinks: string[] = [];
  for (let i = 0; i < optionsNumber; i++) {
    optionImgLinks.push(imgPath + (i + 1) + '.webp');
  }

  const optionsSet: HTMLElement[] = [];

  let selectedOptionNumber = defaults.optionNumber;
  if (localStorageKey) {
    const savedOption = localStorage.getItem(localStorageKey);
    if (savedOption) selectedOptionNumber = +savedOption;
  }

  optionImgLinks.forEach((imgLink, optionNumber) => {
    const option = document.createElement('div');
    const realOptionNumber = optionNumber + 1;

    option.className = optionClassName + ' menu-option';
    if (enableHighlight) enableHighlightOption(option);

    if (enableHighlight && realOptionNumber === selectedOptionNumber) {
      option.classList.add('active-option');
    }

    const image = document.createElement('img');
    image.src = imgLink;
    option.append(image);
    optionsSet.push(option);
  });

  return optionsSet;
};

const lightsColors = ['multicolor', 'red', 'yellow', 'green', 'blue'];

class GameSettings extends Component {
  public musicSwitch!: HTMLElement;
  public snowSwitch!: HTMLElement;
  public lightsSwitch!: HTMLElement;
  public treeOptionsBlock!: HTMLElement;
  public bgOptionsBlock!: HTMLElement;
  public lightsOptionsBlock!: HTMLElement;
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderSwitches() {
    this.musicSwitch = renderSwitch('fa-music', 'bgAudio');
    this.snowSwitch = renderSwitch('fa-snowflakes', 'snow');
    this.lightsSwitch = renderSwitch('fa-lights-holiday', 'lights');
    const settingsBlock = renderGameSettingsBlock(
      this.musicSwitch,
      this.snowSwitch,
      this.lightsSwitch
    );

    this.container.append(settingsBlock);
  }

  renderTreeOptions() {
    const title = document.createElement('p');
    title.textContent = 'Выберите ёлку';

    const treeOptions = getOptionsSet(
      treeOptionsNumber,
      './assets/tree/',
      'tree-option',
      'treeNumber'
    );

    this.treeOptionsBlock = renderGameSettingsBlock(...treeOptions);

    this.container.append(title, this.treeOptionsBlock);
  }

  renderBgOptions() {
    const title = document.createElement('p');
    title.textContent = 'Выберите фон';

    const bgOptions = getOptionsSet(
      bgOptionsNumber,
      './assets/bg/',
      'bg-option',
      'treeBgNumber'
    );

    this.bgOptionsBlock = renderGameSettingsBlock(...bgOptions);

    this.container.append(title, this.bgOptionsBlock);
  }

  renderLightsOptions() {
    const title = document.createElement('p');
    title.textContent = 'Выберите цвет гирлянды';

    const lightsOptions: HTMLElement[] = [];

    lightsColors.forEach((colorName) => {
      const btn = document.createElement('button');
      btn.className = `lights-color-btn ${colorName}-lights-btn`;
      lightsOptions.push(btn);
    });

    this.lightsOptionsBlock = renderGameSettingsBlock(...lightsOptions);

    this.container.append(title, this.lightsOptionsBlock);
  }
}

export default GameSettings;
