import Page from '../../core/templates/page';
import StartPage from '../start-page';
import ToysPage from '../toy-selection-page';
import GamePage from '../game-page';
import ErrorPage from '../error';
import Header from '../../core/components/header';
import Footer from '../../core/components/footer';

export const enum PageIds {
  startPage = 'start',
  toysPage = 'toys',
  gamePage = 'game',
  defaultPageID = 'current-page',
}

class App {
  private static container: HTMLElement = document.body;
  private header: Header;
  private footer: Footer;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${PageIds.defaultPageID}`);
    if (currentPageHTML) currentPageHTML.remove();
    let page: Page | null = null;

    switch (idPage) {
      case PageIds.startPage:
        page = new StartPage(idPage);
        break;
      case PageIds.gamePage:
        page = new GamePage(idPage);
        break;
      case PageIds.toysPage:
        page = new ToysPage(idPage);
        break;
      default:
        page = new ErrorPage(idPage);
        break;
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = PageIds.defaultPageID;
      pageHTML.className = `${page.id}-page`;
      App.container.append(pageHTML);
    }
  }

  static getWindowHash() {
    return window.location.hash.slice(1);
  }

  private renderCurrentPage() {
    const hash = App.getWindowHash();
    if (hash) App.renderNewPage(hash);
    else App.renderNewPage(PageIds.startPage);
  }

  private enableRouteChange() {
    window.addEventListener('load', this.renderCurrentPage);
    window.addEventListener('hashchange', this.renderCurrentPage);
  }

  constructor() {
    this.header = new Header('header', 'header');
    this.footer = new Footer('footer', 'footer');
  }

  static enableHighlightNavButtons() {
    const highlightButton = () => {
      App.container
        .querySelectorAll<HTMLElement>('.header-button')
        .forEach((btn, btnNumber) => {
          btn.classList.remove('selected-nav-button');
          if (btn.getAttribute('data-link') === App.getWindowHash())
            btn.classList.add('selected-nav-button');
          if (!App.getWindowHash() && btnNumber === 0)
            btn.classList.add('selected-nav-button');
        });
    };
    highlightButton();
    window.addEventListener('hashchange', highlightButton);
  }

  run() {
    App.container.append(this.header.render());
    this.enableRouteChange();
    App.container.append(this.footer.render());
    App.enableHighlightNavButtons();
  }
}

export default App;
