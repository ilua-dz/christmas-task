import Page from '../../core/templates/page';

const renderButton = (textContent: string, link: string) => {
  const buttonHTML = document.createElement('a');
  buttonHTML.href = link;
  buttonHTML.textContent = textContent;
  buttonHTML.className = 'button border-rounded';

  return buttonHTML;
};
class StartPage extends Page {
  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createTitle(Page.titlesObject.startPage);
    title.innerHTML += '<br>"Наряди ёлку"';
    this.container.append(title);

    const menu = document.createElement('div');
    menu.className = 'start-page-menu';

    const toysButton = renderButton('Выбрать игрушки', '#toys');
    const gameButton = renderButton('Нарядить ёлку', '#game');

    menu.append(title, toysButton, gameButton);
    this.container.append(menu);
    return this.container;
  }
}

export default StartPage;
