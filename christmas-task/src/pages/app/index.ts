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

const validPageIds = ['start', 'toys', 'game'];

class App {
  private static container: HTMLElement = document.body;
  private header: Header;
  private footer: Footer;
  private bgMusic: HTMLAudioElement;
  static page: ToysPage | GamePage | StartPage | null;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${PageIds.defaultPageID}`);
    if (currentPageHTML) currentPageHTML.remove();
    this.page = null;

    switch (idPage) {
      case PageIds.startPage:
        this.page = new StartPage(idPage);
        break;
      case PageIds.gamePage:
        this.page = new GamePage(idPage);
        break;
      case PageIds.toysPage:
        this.page = new ToysPage(idPage);
        break;
      default:
        this.page = new ErrorPage(idPage);
        break;
    }

    if (this.page) {
      const pageHTML = this.page.render();
      pageHTML.id = PageIds.defaultPageID;
      pageHTML.className = validPageIds.includes(this.page.id)
        ? `${this.page.id}-page`
        : 'error-page';
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

  private enableSaveToysSettings() {
    window.addEventListener('hashchange', () => {
      if (App.page instanceof ToysPage)
        (App.page as ToysPage).saveToysSettings();
    });
    window.addEventListener('beforeunload', () =>
      (App.page as ToysPage).saveToysSettings()
    );
  }

  private enableMusicSwitch() {
    if (App.page instanceof GamePage) {
      (App.page as GamePage).gameSettings.musicSwitch.addEventListener(
        'click',
        () => {
          if (this.bgMusic.paused) {
            this.bgMusic.play();
            localStorage.setItem('bgAudio', '1');
          } else {
            this.bgMusic.pause();
            localStorage.removeItem('bgAudio');
          }
        }
      );
    }
  }

  private enableRestoreMusicPlaying() {
    if (localStorage.getItem('bgAudio')) {
      window.addEventListener('click', () => this.bgMusic.play(), {
        once: true,
      });
    }
  }

  private enableRouteChange() {
    window.addEventListener('load', () => {
      this.renderCurrentPage();
      this.enableMusicSwitch();
      this.enableRestoreMusicPlaying();
    });
    window.addEventListener('hashchange', () => {
      this.renderCurrentPage();
      this.enableMusicSwitch();
    });
  }

  constructor() {
    this.header = new Header('header', 'header');
    this.footer = new Footer('footer', 'footer');
    this.bgMusic = new Audio('./assets/audio/audio.mp3');
    this.bgMusic.onended = () => this.bgMusic.play();
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
    this.enableSaveToysSettings();

    this.enableRouteChange();

    App.container.append(this.footer.render());
    App.enableHighlightNavButtons();
  }
}

export default App;
