import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart {

    element = null;
    subElements = {};
    chartHeight = 50;

    constructor({

        url = '',
        range = {
            from: new Date(),
            to: new Date(),
        },
        label = 'orders',
        formatHeading = data => data
    } = {}) {
        this.url = url;
        this.range = range;
        this.data = [];
        this.label = label;
        this.value = 0;
        this.link = '';
        this.formatHeading = formatHeading;

        this.getDataServer(this.range.from, this.range.to);
        this.render();
    }

    getColumnBody(data) {
        const maxValue = Math.max(...data);
        const scale = this.chartHeight / maxValue;
        return data
            .map(item => {
                const percent = (item / maxValue * 100).toFixed(0);
                return `<div style='--value: ${Math.floor(item * scale)}' data-tooltip='${percent}%'> </div> `;
            })
            .join('');
    }

    getLink() {
        return this.link
            ? `<a class="column-chart__link" href="${this.link}">View all</a>`
            : '';
    }

    get template() {
        return `
        <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
              Total ${this.label} ${this.getLink()}                
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                  ${this.formatHeading(this.value)}
                </div>
                <div data-element="body" class="column-chart__chart">
                    ${this.getColumnBody(this.data)}
                </div>
            </div>
        </div>`

    }
    getData(data) {
        this.data = Object.values(data);
        this.value = this.data.reduce((total, item) => total + item);
        this.show();
    }

    getDataServer(dataFrom, dataTo) {

        fetchJson(`https://course-js.javascript.ru/api/dashboard/${this.label}?from=${dataFrom.toISOString()}&to=${dataTo.toISOString()}`)
            .then(response => {
                this.getData(response);
            })
    }

    render() {
        const element = document.createElement('div');

        element.innerHTML = this.template;

        this.element = element.firstElementChild;

        if (this.data.length) {
            this.element.classList.remove('column-chart_loading');
        }

        this.subElements = this.getSubElements(this.element)

    }
    getSubElements(element) {

        const elements = element.querySelectorAll('[data-element]');

        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;

            return accum;
        }, {});
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = {};
    }

    update(from = this.range.from, to = this.range.to) {
        this.getDataServer(from, to);
    }

    show() {
        this.subElements.body.innerHTML = this.getColumnBody(this.data);
        this.subElements.header.innerHTML = this.formatHeading(this.value);
    }
}