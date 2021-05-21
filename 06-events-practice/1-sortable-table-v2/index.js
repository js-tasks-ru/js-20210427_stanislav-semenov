export default class SortableTable {
  element = null;
  subElements = {};

  handler = event => {

    const target = event.target.textContent;

    if (!event.target.textContent) return;

    for (const item of this.headerConfig) {
      if (item.title === target) {

        if (this.sorted.id === item.id)
          this.sorted.order = this.Toggler(this.sorted.order)
        else this.sorted.order = 'asc';

        this.sorted.id = item.id
        break
      }
    }
    this.sort(this.sorted.id, this.sorted.order)
  }

  constructor(headerConfig = [], {
    data = [],
    sorted = {}
  } = {}) {

    this.headerConfig = headerConfig;
    this.data = data;
    this.sorted = sorted;

    this.render();
    this.sort(this.sorted.id, this.sorted.order);
  }


  addEventListeners() {
    this.element.addEventListener('click', this.handler)
  }
  Toggler(item) {
    return item === 'asc'
      ? 'desc'
      : 'asc';
  }

  // #4
  getTableHeader() {

    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headerConfig.map(item => this.getHeaderRow(item)).join('')}
    </div>`;
  }

  // #5
  getHeaderRow({ id, title, sortable }) {

    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
        <span>${title}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      </div>
    `;
  }

  // #6
  getTableBody() {

    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getTableRows(this.data)}
      </div>`;
  }

  // #7
  getTableRows(data) {

    return data.map(item => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this.getTableRow(item)}
        </a>`;
    }).join('');
  }

  // #8
  getTableRow(item) {

    const cells = this.headerConfig.map(({ id, template }) => {
      return {
        id,
        template
      };
    });

    return cells.map(({ id, template }) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }
  // #3
  getTable() {

    return `
      <div class="sortable-table">
        ${this.getTableHeader()}
        ${this.getTableBody()}
      </div>`;
  }
  // #2
  render() {

    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTable();

    const element = wrapper.firstElementChild;

    this.element = element;
    this.subElements = this.getSubElements(element);
    this.addEventListeners()

  }

  sort(field, order) {

    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getTableRows(sortedData);
  }

  sortData(field, order) {

    const arr = [...this.data];
    const column = this.headerConfig.find(item => item.id === field);
    const { sortType } = column;
    const directions = {
      asc: 1,
      desc: -1
    };
    const direction = directions[order];

    return arr.sort((a, b) => {
      switch (sortType) {
        case 'number':
          return direction * (a[field] - b[field]);
        case 'string':
          return direction * a[field].localeCompare(b[field], ['ru', 'en'], { caseFirst: 'upper' });
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }

  // #1
  getSubElements(element) {

    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}