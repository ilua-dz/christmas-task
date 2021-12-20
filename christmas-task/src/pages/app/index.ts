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

  private renderCurrentPage() {
    const hash = window.location.hash.slice(1);
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

  run() {
    App.container.append(this.header.render());
    this.enableRouteChange();
    App.container.append(this.footer.render());
  }
}

export default App;
