import Component from '../../../core/templates/component';
import ToyCard from './toy-card';
import data, {
  IToyDescription,
  getMinMaxToyPropertyValue,
} from '../../../libs/data';
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

const toyProperties = ['shape', 'color', 'size'];
export interface IDisplaySettingsKeys {
  sorting: { feature: string; direction: string };
  filtersBy: {
    [key: string]: string[] | number[];
    count: [number, number];
    year: [number, number];
    shape: string[];
    color: string[];
    size: string[];
  };
  displayFavouriteOnly: boolean;
}

export const defaultDisplayToysSettings = {
  sorting: { feature: 'name', direction: 'fwd' },
  filtersBy: {
    count: getMinMaxToyPropertyValue('count'),
    year: getMinMaxToyPropertyValue('year'),
    shape: ['none'],
    color: ['none'],
    size: ['none'],
  },
  displayFavouriteOnly: false,
};

class ToysBlock extends Component {
  protected toySet: IToyDescription[];
  protected displayFavouriteOnly: boolean;
  public selectedToysNumbers: number[];
  public displaySettingsKeys: IDisplaySettingsKeys;

  constructor(tagName: string, className: string) {
    super(tagName, className + ' no-border');
    this.toySet = [];
    this.displayFavouriteOnly = false;

    this.restoreSettings();

    window.addEventListener('keyup', (e) => {
      if (e.code === 'KeyQ') {
        console.log(this.displaySettingsKeys);
        console.log(this.selectedToysNumbers);
      }
    });
  }

  private restoreSettings() {
    this.displaySettingsKeys = !localStorage.getItem('displayToysSettings')
      ? defaultDisplayToysSettings
      : JSON.parse(localStorage.getItem('displayToysSettings') as string);

    this.selectedToysNumbers = !localStorage.getItem('selectedToysNumbers')
      ? []
      : JSON.parse(localStorage.getItem('selectedToysNumbers') as string);
  }

  private refreshSelectedToysIndicator() {
    (
      document.querySelector('.amount-selected-toys') as HTMLElement
    ).textContent = this.selectedToysNumbers.length
      ? ` ${this.selectedToysNumbers.length}`
      : '';
  }

  private restoreSelectedCards() {
    this.container
      .querySelectorAll('.toy-card')
      .forEach((toyCard: HTMLElement, number) => {
        if (this.selectedToysNumbers.includes(number + 1))
          toyCard.classList.add('selected-toy');
      });
    this.refreshSelectedToysIndicator();
  }

  enableChooseToy(
    toyCardHTML: HTMLElement,
    cardDescriptionObject: IToyDescription
  ) {
    const cardNumber = +cardDescriptionObject.num;
    toyCardHTML.addEventListener('click', () => {
      if (!toyCardHTML.classList.contains('selected-toy')) {
        if (this.selectedToysNumbers.length < 20) {
          this.selectedToysNumbers.push(cardNumber);
          toyCardHTML.classList.add('selected-toy');
        } else this.renderChooseToyError();
      } else {
        this.selectedToysNumbers.splice(
          this.selectedToysNumbers.indexOf(cardNumber),
          1
        );
        toyCardHTML.classList.remove('selected-toy');
      }
      this.refreshSelectedToysIndicator();
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

  renderCards() {
    const allToysNumbers = [...data].map((toy) => +toy.num);

    allToysNumbers.forEach((n) => {
      const card = new ToyCard('div', 'button toy-card');
      card.renderCard(n);
      const cardHTML = card.render();
      this.enableChooseToy(cardHTML, card.toyDescriptionObject);
      this.container.append(cardHTML);
      this.toySet.push(card.toyDescriptionObject);
    });
    this.restoreSelectedCards();
  }

  sortCards(sortingFeature: string, direction: string) {
    this.toySet = sortToySet(this.toySet, sortingFeature, direction);
    this.container
      .querySelectorAll('.toy-card')
      .forEach((card: HTMLElement, index) => {
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.order = `${this.toySet.indexOf(data[index])}`;
        }, 150);
        setTimeout(() => {
          card.style.opacity = '1';
        }, 300);
      });
    this.saveSortingMethod(sortingFeature, direction);
  }

  private saveSortingMethod(sortingFeature: string, direction: string) {
    this.displaySettingsKeys.sorting.feature = sortingFeature;
    this.displaySettingsKeys.sorting.direction = direction;
  }

  private saveFiltersByValueSettings() {
    toyProperties.forEach((propertyName) => {
      const savedFilterValues = this.displaySettingsKeys.filtersBy[
        propertyName
      ] as string[];
      savedFilterValues.splice(0, savedFilterValues.length);
      document
        .querySelectorAll(`[data-filter-option="${propertyName}"]`)
        .forEach((filter) => {
          const filterValue = filter
            .getAttribute('data-filter-name')
            ?.toLowerCase() as string;

          if (!savedFilterValues.includes(filterValue))
            if (filter.classList.contains('active-filter-option')) {
              savedFilterValues.push(filterValue);
            }
        });
    });
    this.displaySettingsKeys.displayFavouriteOnly = this.displayFavouriteOnly;
  }

  private saveFilterByRangeSettings(propertyName: string, values: number[]) {
    this.displaySettingsKeys.filtersBy[propertyName] = values;
  }

  private applyFilters() {
    this.container.querySelectorAll('.toy-card').forEach((card) => {
      card.classList.add('display-0');

      let checkedFiltersCount = getRepeatCategoryFiltersAmount();
      HTMLElements.activeFilters().forEach((filter) => {
        const filterAttribute: string = filter.getAttribute(
          'data-filter-option'
        ) as string;
        const filterValue: string = filter
          .getAttribute('data-filter-name')
          ?.toLowerCase() as string;
        if (card.getAttribute(`data-${filterAttribute}`) === filterValue)
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
    if (!this.displayFavouriteOnly) card.classList.remove('display-0');
    else if (card.getAttribute('data-favorite'))
      card.classList.remove('display-0');
  }

  private displayFilterError() {
    const cardArray = Array.from(this.container.childNodes);
    const filteredToyCardCount = cardArray
      .map((card: HTMLElement) => getComputedStyle(card).display === 'none')
      .reduce((sum, current) => +sum + +current, 0);

    if (filteredToyCardCount >= 60) {
      const message = document.createElement('h2');
      message.textContent = 'Совпадений не найдено';
      if (!this.container.querySelector('h2')) this.container.append(message);
    } else this.container.querySelector('h2')?.remove();
  }

  filterCardsByRange(propertyName: string, values: number[]) {
    this.container
      .querySelectorAll('.toy-card')
      .forEach((card: HTMLElement) => {
        const propertyValue = +(card.getAttribute(
          `data-${propertyName}`
        ) as string);
        if (propertyValue >= values[0] && propertyValue <= values[1])
          card.classList.remove(`filtered-by-${propertyName}-range`);
        else card.classList.add(`filtered-by-${propertyName}-range`);
      });

    this.displayFilterError();

    this.saveFilterByRangeSettings(propertyName, values);
  }

  filterCardsByValue() {
    this.displayFavouriteOnly = document
      .querySelector('.favourite-filter-option')
      ?.classList.contains('active-favourite-option') as boolean;

    if (HTMLElements.activeFilters().length > 0) this.applyFilters();
    else this.unfilter();

    this.displayFilterError();

    this.saveFiltersByValueSettings();
  }

  searchCards(searchString: string) {
    this.container
      .querySelectorAll('.toy-card')
      .forEach((card: HTMLElement) => {
        const toyName = card.getAttribute('data-name');
        if (!toyName?.includes(searchString))
          card.classList.add('filtered-by-search');
        else card.classList.remove('filtered-by-search');
      });
    this.displayFilterError();
  }

  resetFilters() {
    this.container
      .querySelectorAll('.toy-card')
      .forEach((card: HTMLElement) => {
        card.classList.remove(
          'display-0',
          'filtered-by-count-range',
          'filtered-by-year-range',
          'filtered-by-search'
        );
      });
    this.displayFilterError();
  }
}

export default ToysBlock;
