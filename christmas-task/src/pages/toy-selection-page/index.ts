import Page from '../../core/templates/page';
import HTMLElements from '../../core/utils/html-elements';
import DisplaySettings from './display-settings-block';
import ToysBlock from './toys-block';

import { target as noUiSliderTarget } from 'nouislider';
import { defaultDisplayToysSettings } from './toys-block';

class ToysPage extends Page {
  private displaySettings: DisplaySettings;
  private toysBlock: ToysBlock;
  private sortByNameBtn!: HTMLElement;
  private sortByDateBtn!: HTMLElement;
  private favouriteOnlyBtn!: HTMLElement;
  constructor(id: string) {
    super(id);
    this.displaySettings = new DisplaySettings('div', 'filter-settings');
    this.toysBlock = new ToysBlock('div', 'toys-block');
  }

  render() {
    this.displaySettings.renderSortingModule();
    this.displaySettings.renderFiltersModule();

    this.toysBlock.renderCards();

    this.container.append(
      this.displaySettings.render(),
      this.toysBlock.render()
    );

    this.restoreRangeSliders();

    this.declareButtons();

    this.enableSorting();
    this.enableFilteringByValues();
    this.enableFilteringByRange('count');
    this.enableFilteringByRange('year');
    this.enableSearch();
    this.enableFiltersReset();
    this.enableSelectionReset();
    this.enableSaveDisplayToysSettings();

    this.restoreSorting();
    this.restoreFilters();

    return this.container;
  }

  private declareButtons() {
    this.sortByNameBtn = HTMLElements.sortByNameBtn(
      this.container
    ) as HTMLElement;

    this.sortByDateBtn = HTMLElements.sortByDateBtn(
      this.container
    ) as HTMLElement;

    this.favouriteOnlyBtn = HTMLElements.favouriteOnlyBtn(
      this.container
    ) as HTMLElement;
  }

  private sortCards(feature: string, e: Event) {
    const target = e.target as HTMLElement;
    if (target.id === `sort-by-${feature}`)
      this.toysBlock.sortCards(feature, 'fwd');
    else if (target.id === `sort-by-${feature}-reverse`)
      this.toysBlock.sortCards(feature, 'reverse');
  }

  private enableSorting() {
    this.sortByNameBtn.addEventListener('click', (e) =>
      this.sortCards('name', e)
    );
    this.sortByDateBtn.addEventListener('click', (e) =>
      this.sortCards('date', e)
    );
  }

  private restoreSorting() {
    const sortMethod = this.toysBlock.displaySettingsKeys.sorting;
    switch (sortMethod.feature) {
      case 'name':
        if (sortMethod.direction === 'reverse') this.sortByNameBtn.click();
        this.sortByNameBtn.click();
        break;
      case 'date':
        if (sortMethod.direction === 'reverse') this.sortByDateBtn.click();
        this.sortByDateBtn.click();
        break;
      default:
        break;
    }
  }

  private enableFilteringByValues() {
    HTMLElements.filterOptionBtns(this.container)?.forEach((btn) =>
      btn.addEventListener('click', () => this.toysBlock.filterCardsByValue())
    );
  }

  private restoreFilters() {
    const savedFilters = this.toysBlock.displaySettingsKeys.filtersBy;

    for (const key in savedFilters) {
      savedFilters[key].forEach((filterOption) => {
        HTMLElements.filterOptionBtns(this.container).forEach((btn) => {
          if (
            btn.getAttribute('data-filter-option') === key &&
            (btn.getAttribute('data-filter-name')?.toLowerCase() as string) ===
              filterOption
          ) {
            setTimeout(() => {
              (btn as HTMLElement).click();
            }, 100);
          }
        });
      });
    }

    if (this.toysBlock.displaySettingsKeys.displayFavouriteOnly)
      this.favouriteOnlyBtn.click();
  }

  private enableFilteringByRange(propertyName: string) {
    const inputSlider = this.container.querySelector(
      `#${propertyName}-range-input`
    ) as noUiSliderTarget;

    inputSlider.noUiSlider?.on('update', () => {
      const values = inputSlider.noUiSlider?.get() as number[];
      this.toysBlock.filterCardsByRange(propertyName, values);
    });
  }

  private restoreRangeSliders() {
    const inputSliders = this.container.querySelectorAll(
      '.range-slider-container'
    );
    const countValues = [...this.toysBlock.displaySettingsKeys.filtersBy.count];
    const dateValues = [...this.toysBlock.displaySettingsKeys.filtersBy.year];

    (inputSliders[0] as noUiSliderTarget).noUiSlider?.set(countValues);
    (inputSliders[1] as noUiSliderTarget).noUiSlider?.set(dateValues);
  }

  private enableSearch() {
    const searchField = this.container.querySelector(
      '.search-field'
    ) as HTMLInputElement;
    const searchResetButton = this.container.querySelector(
      '.search-reset-button'
    );
    searchField.addEventListener('input', () =>
      this.toysBlock.searchCards(searchField.value)
    );
    searchResetButton?.addEventListener('click', () =>
      this.toysBlock.searchCards(searchField.value)
    );
  }

  private enableFiltersReset() {
    const resetButton = this.container.querySelector('.reset-filters-button');
    resetButton?.addEventListener('click', () => {
      this.toysBlock.resetFilters();
      this.container
        .querySelectorAll('.active-filter-option')
        .forEach((option) => {
          option.classList.remove('active-filter-option');
        });
      this.container
        .querySelector('.active-favourite-option')
        ?.classList.remove('active-favourite-option');
      (
        this.container.querySelector('.search-reset-button') as HTMLElement
      ).click();
      this.container
        .querySelectorAll<HTMLElement>('.noUi-target')
        .forEach((slider: noUiSliderTarget) => {
          slider.noUiSlider?.reset();
        });
      this.toysBlock.displaySettingsKeys = defaultDisplayToysSettings;
    });
  }

  private enableSelectionReset() {
    const resetButton = this.container.querySelector('.reset-selection-button');

    resetButton?.addEventListener('click', () => {
      this.toysBlock.resetToysSelection();
      localStorage.clear();
    });
  }

  private enableSaveDisplayToysSettings() {
    const saveDisplayToysSettings = () => {
      localStorage.setItem(
        'displayToysSettings',
        JSON.stringify(this.toysBlock.displaySettingsKeys)
      );
      localStorage.setItem(
        'selectedToysNumbers',
        JSON.stringify(this.toysBlock.selectedToysNumbers)
      );
    };
    window.addEventListener('hashchange', saveDisplayToysSettings);
    window.addEventListener('beforeunload', saveDisplayToysSettings);
  }
}

export default ToysPage;
