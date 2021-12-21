import Component from '../../../core/templates/component';
import ToyCard from './toy-card';
import data, { IToyDescription } from '../../../libs/data';
import { sortToySet } from '../utils';
import HTMLElements from '../../../core/utils/html-elements';

const getRepeatCategoryFiltersAmount = () => {
  const filterOptions: string[] = [];
  HTMLElements.activeFilters().forEach((filter) =>
    filterOptions.push(filter.getAttribute('data-filter-option') as string)
  );
  const filterOptionsSet = new Set(filterOptions);
  return filterOptions.length - [...filterOptionsSet].length;
};

class ToysBlock extends Component {
  protected toySet: IToyDescription[];
  protected displayIsFavouriteOnly: boolean;
  public selectedToys: IToyDescription[];

  constructor(tagName: string, className: string) {
    super(tagName, className + ' no-border');
    this.toySet = [];
    this.displayIsFavouriteOnly = false;
    this.selectedToys = [];
  }

  enableChooseToy(
    toyCardHTML: HTMLElement,
    cardDescriptionObject: IToyDescription
  ) {
    toyCardHTML.addEventListener('click', () => {
      if (!toyCardHTML.classList.contains('selected-toy')) {
        if (this.selectedToys.length < 20) {
          this.selectedToys.push(cardDescriptionObject);
          toyCardHTML.classList.add('selected-toy');
        } else this.renderChooseToyError();
      } else {
        this.selectedToys.splice(
          this.selectedToys.indexOf(cardDescriptionObject),
          1
        );
        toyCardHTML.classList.remove('selected-toy');
      }
      (
        document.querySelector('.amount-selected-toys') as HTMLElement
      ).textContent = this.selectedToys.length
        ? ` ${this.selectedToys.length}`
        : '';
    });
  }

  private renderChooseToyError() {
    const popupHTML = document.createElement('div');
    popupHTML.className = 'popup';
    popupHTML.textContent = 'Выбрано максимальное количество игрушек';
    this.container.append(popupHTML);
    setTimeout(() => {
      popupHTML.style.opacity = '1';
    }, 50);
    setTimeout(() => {
      popupHTML.style.opacity = '0';
    }, 2000);
    setTimeout(() => {
      popupHTML.remove();
    }, 2500);
  }

  renderCards(...cardNumbers: number[]) {
    cardNumbers.forEach((n) => {
      const card = new ToyCard('div', 'button toy-card');
      card.renderCard(n);
      const cardHTML = card.render();
      this.enableChooseToy(cardHTML, card.toyDescriptionObject);
      this.container.append(cardHTML);
      this.toySet.push(card.toyDescriptionObject);
    });
  }

  sortCards(sortingFeature: string, direction: string) {
    this.toySet = sortToySet(this.toySet, sortingFeature, direction);
    this.container
      .querySelectorAll('.toy-card')
      .forEach((card: HTMLElement, index) => {
        card.style.order = `${this.toySet.indexOf(data[index])}`;
      });
  }

  private applyFilters() {
    this.container.querySelectorAll('.toy-card').forEach((card) => {
      card.classList.add('display-0');

      let checkedFiltersCount = getRepeatCategoryFiltersAmount();
      HTMLElements.activeFilters().forEach((filter) => {
        if (
          card.getAttribute(
            `data-${filter.getAttribute('data-filter-option') as string}`
          ) === filter.getAttribute('data-filter-name')?.toLowerCase()
        )
          checkedFiltersCount++;
      });
      if (checkedFiltersCount === HTMLElements.activeFilters().length)
        this.applyFavouriteFilter(card as HTMLElement);
    });
  }

  private unfilter() {
    this.container.querySelectorAll('.toy-card').forEach((card) => {
      card.classList.add('display-0');
      this.applyFavouriteFilter(card as HTMLElement);
    });
  }

  private applyFavouriteFilter(card: HTMLElement) {
    if (!this.displayIsFavouriteOnly) card.classList.remove('display-0');
    else if (card.getAttribute('data-favorite'))
      card.classList.remove('display-0');
  }

  private displayFilterError() {
    if (this.container.querySelectorAll('.display-0').length === 60) {
      const message = document.createElement('h2');
      message.textContent = 'По введенным параметрам игрушки не найдены.';
      this.container.append(message);
    } else this.container.querySelector('h2')?.remove();
  }

  filterCards() {
    this.displayIsFavouriteOnly = document
      .querySelector('.favourite-filter-option')
      ?.classList.contains('selected-option') as boolean;

    if (HTMLElements.activeFilters().length > 0) this.applyFilters();
    else this.unfilter();

    this.displayFilterError();
  }
}

export default ToysBlock;
