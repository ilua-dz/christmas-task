const HTMLElements = {
  sortByNameBtn: (container: HTMLElement) =>
    container.querySelector('#sort-by-name'),

  sortByDateBtn: (container: HTMLElement) =>
    container.querySelector('#sort-by-date'),

  filterOptionBtns: (container: HTMLElement) =>
    container.querySelectorAll('.filter-option'),

  activeFilters: () => document.querySelectorAll('.active-filter-option'),
};

export default HTMLElements;
