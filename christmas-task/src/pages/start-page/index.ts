import Page from '../../core/templates/page';

class StartPage extends Page {
  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createTitle(Page.titlesObject.startPage);
    const message = document.createElement('h2');
    message.classList.add('message');
    message.textContent =
      'Функционал приложения дорабатывается. Прошу приступить к кросс-чек ревью не раньше 23.12.2021';
    this.container.append(title, message);
    return this.container;
  }
}

export default StartPage;
