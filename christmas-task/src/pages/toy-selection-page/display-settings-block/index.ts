import Component from '../../../core/templates/component';

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
  constructor(tagName: string, className: string) {
    super(tagName, className);
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
        if (optionBlock.classList.contains('selected-option')) {
          toggleId(optionBlock, option.buttonId, option.reversButtonId);
          optionIcon.classList.toggle(option.forwardDirectionClass);
          optionIcon.classList.toggle(option.reverseDirectionClass);
        }

        document.querySelectorAll('.sort-option').forEach((_option) => {
          _option.classList.remove('selected-option');
        });

        optionBlock.classList.add('selected-option');
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

    const filterByShapeModule = this.renderFilterByShapeOptions();
    const filterByColorModule = this.renderFilterByColorOptions();
    const filterBySizeModule = this.renderFilterBySizeOptions();
    const filterByFavouriteModule = this.renderFavouriteOnlyOption();

    this.container.append(
      blockTitle,
      filterByShapeModule,
      filterByColorModule,
      filterBySizeModule,
      filterByFavouriteModule
    );
  }

  private renderModule(className: string, moduleName: string) {
    const module = document.createElement('div');
    module.className = className;

    const moduleNameString = document.createElement('div');
    moduleNameString.textContent = moduleName;
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
        optionBlock.classList.toggle('shape-filter-option_active');
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
        optionBlock.classList.toggle('selected-option');
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
      optionBlock.classList.toggle('selected-option');
    });

    filterByFavouriteModule.append(optionBlock);
    return filterByFavouriteModule;
  }
}

export default DisplaySettings;
