import './snow.css';
import './lights.css';

import Component from '../../../core/templates/component';

const enum lightsOptions {
  startAngle = 70,
  endAngle = 113,
  angleStep = 10,
  startRadius = 100,
  endRadius = 600,
  radiusStep = 100,
  treeImageWidth = 500,
  multicolorColorsAmount = 3,
  cssTransition = 500,
}

const enum snowOptions {
  density = 125,
  cssTransition = 500,
}

class GameField extends Component {
  public treeImage!: HTMLImageElement;
  public bgImage!: HTMLImageElement;
  public lightsContainer!: HTMLElement;
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
    this.lightsContainer = document.createElement('div');
    this.lightsContainer.className = 'lights-container';

    const map = createTreeMap();

    this.treeImage = document.createElement('img');
    this.treeImage.className = 'tree-image';
    this.treeImage.src = `./assets/tree/${treeNumber}.webp`;
    this.treeImage.useMap = `#${map.id}`;

    this.lightsContainer.append(this.treeImage);

    this.container.append(this.lightsContainer, map);
  }

  switchSnow(direction: boolean) {
    if (direction) {
      const snowArea = document.createElement('div');
      snowArea.className = 'snowflakes';
      for (let i = 0; i < snowOptions.density; i++)
        snowArea.append(document.createElement('i'));

      this.container.append(snowArea);
    } else {
      const snowArea = this.container.querySelector(
        '.snowflakes'
      ) as HTMLElement;
      snowArea.style.opacity = '0';
      setTimeout(() => {
        snowArea.remove();
      }, snowOptions.cssTransition);
    }
  }

  switchLights(direction: boolean) {
    if (direction) {
      for (
        let i = lightsOptions.startRadius;
        i <= lightsOptions.endRadius;
        i += lightsOptions.radiusStep
      )
        this.lightsContainer.append(getLightsLine(i));
    } else {
      const lights = this.container.querySelectorAll<HTMLElement>('.lightrope');
      lights.forEach((lightsLine) => {
        lightsLine.style.opacity = '0';
        setTimeout(() => {
          lightsLine.remove();
        }, lightsOptions.cssTransition);
      });
    }
  }

  changeLightsColor(color?: string) {
    if (!color) document.documentElement.removeAttribute('style');
    else
      for (let i = 1; i <= lightsOptions.multicolorColorsAmount; i++) {
        document.documentElement.style.setProperty(`--lights-color${i}`, color);
      }
  }
}

const getLightsLine = (radius: number) => {
  const lights = document.createElement('ul');
  lights.className = 'lightrope';

  for (
    let i = lightsOptions.startAngle;
    i <= lightsOptions.endAngle;
    i += lightsOptions.angleStep - radius / lightsOptions.radiusStep
  ) {
    const light = document.createElement('li');
    const posX = radius * Math.cos((i * Math.PI) / 180);
    const posY = radius * Math.sin((i * Math.PI) / 180);
    light.style.left = `${posX + lightsOptions.treeImageWidth / 2}px`;
    light.style.top = `${posY}px`;
    lights.append(light);
  }
  return lights;
};

const createTreeMap = () => {
  const map = document.createElement('map');
  map.name = 'tree-map';
  map.id = 'tree-map';
  map.innerHTML =
    '<area coords="21,599,240,5,492,614,379,640,248,648,95,633" shape="poly">';
  return map;
};

export default GameField;
