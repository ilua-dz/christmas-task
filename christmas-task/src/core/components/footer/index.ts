import Component from '../../templates/component';

const links = [
  {
    link: 'https://github.com/ilua-dz',
    text: 'Ilya Dzyuin',
  },
  {
    link: 'https://rs.school/js/',
    text: '<img src="./assets/svg/rs_school_js.svg">',
  },
];

class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderButtons() {
    const buttonsContainer = document.createElement('div');
    links.forEach((link) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = link.link;
      buttonHTML.target = '_blank';
      buttonHTML.innerHTML = link.text;
      buttonsContainer.append(buttonHTML);
    });
    const yearString = document.createElement('p');
    yearString.textContent = '2021';

    buttonsContainer.insertBefore(yearString, buttonsContainer.lastChild);
    this.container.append(buttonsContainer);
  }

  render() {
    this.renderButtons();
    return this.container;
  }
}

export default Footer;
