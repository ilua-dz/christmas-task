import Component from '../../templates/component';
import { PageIds } from '../../../pages/app';

const buttons = [
  {
    id: PageIds.startPage,
    text: 'Start Page',
  },
  {
    id: PageIds.toysPage,
    text: 'Toys Page',
  },
  {
    id: PageIds.gamePage,
    text: 'Game Page',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderButtons() {
    const buttonsContainer = document.createElement('div');
    buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.textContent = button.text;
      buttonsContainer.append(buttonHTML);
    });
    this.container.append(buttonsContainer);
  }

  render() {
    this.renderButtons();
    return this.container;
  }
}

export default Header;
