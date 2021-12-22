import Page from '../../core/templates/page';
import HTMLElements from '../../core/utils/html-elements';
import DisplaySettings from './display-settings-block';
import ToysBlock from './toys-block';

import { target as noUiSliderTarget } from 'nouislider';

class ToysPage extends Page {
  private displaySettings: DisplaySettings;
  private toysBlock: ToysBlock;
  constructor(id: string) {
    super(id);
    this.displaySettings = new DisplaySettings('div', 'filter-settings');
    this.toysBlock = new ToysBlock('div', 'toys-block');
  }

  render() {
    this.displaySettings.renderSortingModule();
    this.displaySettings.renderFiltersModule();

    const array = [];
    for (let i = 1; i < 61; i++) {
      array.push(i);
    }
    this.toysBlock.renderCards(...array);

    this.container.append(
      this.displaySettings.render(),
      this.toysBlock.render()
    );
    this.enableSorting();
    this.enableFilteringByValues();
    this.enableFilteringByRange('count');
    this.enableFilteringByRange('year');
    this.enableSearch();
    return this.container;
  }

  private enableSorting() {
    HTMLElements.sortByNameBtn(this.container)?.addEventListener(
      'click',
      (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'sort-by-name')
          this.toysBlock.sortCards('name', 'fwd');
        else if (target.id === 'sort-by-name-reverse')
          this.toysBlock.sortCards('name', 'reverse');
      }
    );
    HTMLElements.sortByDateBtn(this.container)?.addEventListener(
      'click',
      (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'sort-by-date')
          this.toysBlock.sortCards('year', 'fwd');
        else if (target.id === 'sort-by-date-reverse')
          this.toysBlock.sortCards('year', 'reverse');
      }
    );
  }

  private enableFilteringByValues() {
    HTMLElements.filterOptionBtns(this.container)?.forEach((btn) =>
      btn.addEventListener('click', () => this.toysBlock.filterCardsByValue())
    );
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

  private enableSearch() {
    const searchField = this.container.querySelector(
      '.search-field'
    ) as HTMLInputElement;
    const searchResetButton = this.container.querySelector(
      '.search-reset-button'
    );
    searchField.addEventListener('keyup', () =>
      this.toysBlock.searchCards(searchField.value)
    );
    searchResetButton?.addEventListener('click', () =>
      this.toysBlock.searchCards(searchField.value)
    );
  }
}

export default ToysPage;
