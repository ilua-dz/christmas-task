import Component from '../../templates/component';
import { PageIds } from '../../../pages/app';

const buttons = [
  {
    id: PageIds.startPage,
    icon: '<i class="fa-thin fa-star-christmas"></i>',
    text: 'Главная',
  },
  {
    id: PageIds.toysPage,
    icon: '<i class="fa-thin fa-ornament amount-selected-toys"></i>',
    text: 'Выбор игрушек',
  },
  {
    id: PageIds.gamePage,
    icon: '<i class="fa-thin fa-tree-christmas"></i>',
    text: 'Наряди ёлку!',
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
      buttonHTML.classList.add('button', 'header-button');
      buttonHTML.setAttribute('data-link', button.id);

      const buttonDescription = document.createElement('p');
      buttonDescription.classList.add('button__description');
      buttonDescription.textContent = button.text;

      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerHTML = button.icon;
      buttonHTML.append(buttonDescription);

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
