abstract class Page {
  protected container: HTMLElement;
  static titlesObject = {
    startPage: 'Новогодняя игра',
    toysPage: 'Выбор игрушек',
    gamePage: 'Наряди ёлку ...',
    errorPage: 'Упс! Такой страницы не существует ...',
  };

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  protected createTitle(text: string) {
    const title = document.createElement('h1');
    title.textContent = text;
    return title;
  }

  render() {
    return this.container;
  }
}

export default Page;
