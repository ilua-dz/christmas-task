import Component from '../../../core/templates/component';
import { getOptionsSet, renderGameSettingsBlock } from '../game-settings-block';
import data from '../../../libs/data';

const defaultToysNumbers = Array.from(new Array(20), (number, i) => i + 1);

class GamePanel extends Component {
  public toysBlock!: HTMLElement;
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderToysBlock() {
    const title = document.createElement('h3');
    title.textContent = 'Выбранные игрушки';

    this.toysBlock = document.createElement('div');
    const selectedToysString = localStorage.getItem('selectedToysNumbers');
    const selectedToysNumbers = selectedToysString
      ? JSON.parse(selectedToysString)
      : defaultToysNumbers;

    const toysOptions = getOptionsSet(
      selectedToysNumbers.length,
      './assets/toys/',
      'selected-toy-card',
      undefined,
      false
    );

    toysOptions.forEach((toyCard, toyNumberInSet) => {
      const toyNumber = selectedToysNumbers[toyNumberInSet];
      const toyAmount = data[toyNumber - 1].count;
      toyCard.setAttribute('data-amount', toyAmount);

      const toyAmountIndicator = document.createElement('div');
      toyAmountIndicator.className = 'toy-amount-indicator';
      toyAmountIndicator.textContent = toyAmount;

      toyCard.append(toyAmountIndicator);
    });

    this.toysBlock = renderGameSettingsBlock(...toysOptions);
    this.toysBlock.className = 'selected-toys-block';

    this.container.append(title, this.toysBlock);
  }

  renderDecoratedTreesBlock() {
    const title = document.createElement('h3');
    title.textContent = 'Ваши ёлки';

    this.container.append(title);
  }
}

export default GamePanel;
