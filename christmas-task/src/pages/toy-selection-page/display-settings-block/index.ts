import Component from '../../../core/templates/component';
import { getMinMaxToyPropertyValue } from '../../../libs/data';

import noUiSlider from 'nouislider';
import { target as noUiSliderTarget } from 'nouislider';

import {
  IDisplaySettingsKeys,
  defaultDisplayToysSettings,
} from '../toys-block';

const sortingOptions = [
  {
    name: 'По имени',
    buttonId: 'sort-by-name',
    reversButtonId: 'sort-by-name-reverse',
    forwardDirectionClass: 'fa-arrow-down-a-z',
    reverseDirectionClass: 'fa-arrow-down-z-a',
  },
  {
    name: 'По дате',
    buttonId: 'sort-by-date',
    reversButtonId: 'sort-by-date-reverse',
    forwardDirectionClass: 'fa-arrow-down-1-9',
    reverseDirectionClass: 'fa-arrow-down-9-1',
  },
];

const filterByShapeOptions = [
  {
    name: 'Шар',
    buttonId: 'ball',
  },
  {
    name: 'Колокольчик',
    buttonId: 'bell',
  },
  {
    name: 'Фигурка',
    buttonId: 'toy',
  },
  {
    name: 'Шишка',
    buttonId: 'cone',
  },
  {
    name: 'Снежинка',
    buttonId: 'snowflake',
  },
];

const filterByColorOptions = [
  {
    name: 'белый',
    colorHex: '#ffffff',
  },
  {
    name: 'желтый',
    colorHex: '#ffff00',
  },
  {
    name: 'красный',
    colorHex: '#ff0000',
  },
  {
    name: 'синий',
    colorHex: '#0000ff',
  },
  {
    name: 'зелёный',
    colorHex: '#00ff00',
  },
];

const filterBySizeOptions = ['большой', 'средний', 'малый'];

const toggleId = (block: HTMLElement, firstId: string, secondId: string) => {
  if (block.id === firstId) block.id = secondId;
  else if (block.id === secondId) block.id = firstId;
};

class DisplaySettings extends Component {
  private displaySettings: IDisplaySettingsKeys;
  constructor(tagName: string, className: string) {
    super(tagName, className);

    this.restoreSettings();
  }

  private restoreSettings() {
    this.displaySettings = !localStorage.getItem('displayToysSettings')
      ? defaultDisplayToysSettings
      : JSON.parse(localStorage.getItem('displayToysSettings') as string);
  }

  renderSortingModule() {
    const sortingSettingsBlock = document.createElement('div');
    sortingSettingsBlock.className = 'sorting-settings';

    const blockTitle = document.createElement('h3');
    blockTitle.textContent = 'Настройки отображения';

    const moduleNameString = document.createElement('div');
    moduleNameString.textContent = 'Сортировка';
    sortingSettingsBlock.append(moduleNameString);

    sortingOptions.forEach((option) => {
      const optionBlock = document.createElement('div');
      optionBlock.className = 'sort-option button';
      optionBlock.id = option.buttonId as string;
      optionBlock.textContent = option.name;

      const optionIcon = document.createElement('i');
      optionIcon.className = 'fa-light';
      optionIcon.classList.add(option.forwardDirectionClass);

      optionBlock.append(optionIcon);

      optionBlock.addEventListener('click', () => {
        if (optionBlock.classList.contains('active-sort-option')) {
          toggleId(optionBlock, option.buttonId, option.reversButtonId);
          optionIcon.classList.toggle(option.forwardDirectionClass);
          optionIcon.classList.toggle(option.reverseDirectionClass);
        }

        document.querySelectorAll('.sort-option').forEach((_option) => {
          _option.classList.remove('active-sort-option');
        });

        optionBlock.classList.add('active-sort-option');
      });

      sortingSettingsBlock.append(optionBlock);
    });

    this.container.append(blockTitle, sortingSettingsBlock);
  }

  renderFiltersModule() {
    const filterSettingsBlock = document.createElement('div');
    filterSettingsBlock.className = 'sorting-settings';

    const blockTitle = document.createElement('h4');
    blockTitle.textContent = 'Фильтровать по:';

    const searchModule = this.renderSearchModule();
    const filterByShapeModule = this.renderFilterByShapeOptions();
    const filterByColorModule = this.renderFilterByColorOptions();
    const filterBySizeModule = this.renderFilterBySizeOptions();
    const filterByFavouriteModule = this.renderFavouriteOnlyOption();
    const filterByCountModule = this.renderRangeFilterOption(
      'Количеству:',
      'count'
    );
    const filterByYearModule = this.renderRangeFilterOption(
      'Году&nbsp;покупки:',
      'year'
    );
    const resetFiltersButton = this.renderFilterResetButton();
    const resetSelectionButton = this.renderResetSelectionButton();

    this.container.prepend(searchModule);

    this.container.append(
      blockTitle,
      filterByShapeModule,
      filterByColorModule,
      filterBySizeModule,
      filterByFavouriteModule,
      filterByCountModule,
      filterByYearModule,
      resetFiltersButton,
      resetSelectionButton
    );
  }

  private renderModule(className: string, moduleName: string) {
    const module = document.createElement('div');
    module.className = className;

    const moduleNameString = document.createElement('div');
    moduleNameString.innerHTML = moduleName;
    module.append(moduleNameString);

    return module;
  }

  private renderFilterByShapeOptions() {
    const filterByShapeModule = this.renderModule(
      'filter-by-shape-block',
      'Форме:'
    );

    filterByShapeOptions.forEach((shape) => {
      const optionBlock = document.createElement('img');
      optionBlock.src = `./assets/svg/${shape.buttonId}.svg`;
      optionBlock.alt = shape.name;
      optionBlock.className = 'filter-option shape-filter-option button';
      optionBlock.setAttribute('data-filter-option', 'shape');
      optionBlock.setAttribute('data-filter-name', shape.name);

      optionBlock.addEventListener('click', () => {
        optionBlock.classList.toggle('active-filter-option');
      });

      filterByShapeModule.append(optionBlock);
    });

    return filterByShapeModule;
  }

  private renderFilterByColorOptions() {
    const filterByColorModule = this.renderModule(
      'filter-by-color-block',
      'Цвету:'
    );

    filterByColorOptions.forEach((color) => {
      const optionBlock = document.createElement('div');
      optionBlock.className = 'filter-option color-filter-option button';
      optionBlock.style.backgroundColor = color.colorHex;
      optionBlock.setAttribute('data-filter-option', 'color');
      optionBlock.setAttribute('data-filter-name', color.name);

      optionBlock.addEventListener('click', () => {
        optionBlock.classList.toggle('active-filter-option');
      });

      filterByColorModule.append(optionBlock);
    });
    return filterByColorModule;
  }

  private renderFilterBySizeOptions() {
    const filterBySizeModule = this.renderModule(
      'filter-by-size-block',
      'Размеру:'
    );

    filterBySizeOptions.forEach((size) => {
      const optionBlock = document.createElement('div');
      optionBlock.className = 'filter-option size-filter-option button';
      optionBlock.textContent = size;

      optionBlock.setAttribute('data-filter-option', 'size');
      optionBlock.setAttribute('data-filter-name', size);

      optionBlock.addEventListener('click', () => {
        optionBlock.classList.toggle('active-filter-option');
      });

      filterBySizeModule.append(optionBlock);
    });
    return filterBySizeModule;
  }

  private renderFavouriteOnlyOption() {
    const filterByFavouriteModule = this.renderModule(
      'filter-by-favourite-block',
      'Только любимые:'
    );
    const optionBlock = document.createElement('div');
    optionBlock.className = 'filter-option favourite-filter-option button';
    optionBlock.innerHTML = '<i class="fa-light fa-check"></i>';

    optionBlock.addEventListener('click', () => {
      optionBlock.classList.toggle('active-favourite-option');
    });

    filterByFavouriteModule.append(optionBlock);
    return filterByFavouriteModule;
  }

  private renderRangeFilterOption(
    moduleName: string,
    property: string,
    rangeSliderIdName = `${property}-range-input`
  ) {
    const optionHTML = this.renderModule('range-filter-block', moduleName);

    const minValue = document.createElement('div');
    minValue.className = 'range-filter-value button';

    const maxValue = document.createElement('div');
    maxValue.className = 'range-filter-value button';

    const optionBlock: noUiSliderTarget = document.createElement('div');
    optionBlock.className = 'range-slider-container';
    optionBlock.id = rangeSliderIdName;
    noUiSlider.create(optionBlock, {
      start: getMinMaxToyPropertyValue(property),
      connect: true,
      step: 1,
      behaviour: 'drag-tap',
      range: {
        min: getMinMaxToyPropertyValue(property)[0],
        max: getMinMaxToyPropertyValue(property)[1],
      },
      format: {
        to: (value) => Math.round(value),
        from: (value) => Number(value),
      },
    });

    optionBlock.noUiSlider?.on('update', () => {
      const sliderValues = optionBlock.noUiSlider?.get() as number[];
      minValue.textContent = `${sliderValues[0]}`;
      maxValue.textContent = `${sliderValues[1]}`;
    });

    optionHTML.append(minValue, optionBlock, maxValue);
    return optionHTML;
  }

  private renderSearchModule() {
    const searchModule = this.renderModule('search-module', 'Поиск: ');
    const searchFieldContainer = document.createElement('div');
    searchFieldContainer.className = 'search-field-container';

    const searchField = document.createElement('input');
    searchField.type = 'text';
    searchField.className = 'search-field button';
    searchField.autofocus = true;
    searchField.autocomplete = 'off';
    searchField.placeholder = 'Введите название игрушки';

    const searchButton = document.createElement('i');
    searchButton.className = 'fa-light fa-magnifying-glass search-button';

    const searchResetButton = document.createElement('i');
    searchResetButton.className = 'fa-light fa-xmark search-reset-button';

    searchField.addEventListener('keyup', () =>
      displaySearchResetButton(searchField, searchResetButton)
    );
    searchResetButton.addEventListener('click', () => {
      searchField.value = '';
      displaySearchResetButton(searchField, searchResetButton);
    });

    searchFieldContainer.append(searchField, searchButton, searchResetButton);

    setTimeout(() => searchField.focus(), 200);

    searchModule.append(searchFieldContainer);
    searchField.focus();
    return searchModule;
  }

  private renderResetButton(className: string, buttonDescription: string) {
    const resetButton = document.createElement('div');
    resetButton.className = 'reset-button button ' + className;
    resetButton.textContent = buttonDescription;

    return resetButton;
  }

  private renderFilterResetButton() {
    return this.renderResetButton('reset-filters-button', 'Сбросить фильтры');
  }

  private renderResetSelectionButton() {
    return this.renderResetButton(
      'reset-selection-button',
      'Сбросить избранные игрушки'
    );
  }
}

const displaySearchResetButton = (
  searchField: HTMLInputElement,
  searchResetButton: HTMLElement
) => {
  if (searchField.value) searchResetButton.style.opacity = '1';
  else searchResetButton.style.opacity = '0';
};

export default DisplaySettings;
