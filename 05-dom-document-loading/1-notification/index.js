export default class NotificationMessage {
    static displayNotification;

    constructor(
        string = '',
        {
            duration = 0,
            type = ''
        } = {}) {
        if (NotificationMessage.displayNotification) {
            NotificationMessage.displayNotification.remove();
        }

        this.string = string;
        this.duration = duration;
        this.type = type;

        this.render();
    }

    show(sub = document.body) {

        sub.append(this.render());
        setTimeout(() => this.destroy(), this.duration);
    }

    get template() {
        return `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.string}
          </div>
        </div>
      </div>`;
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = this.template;
        this.element = element.firstElementChild;
        return NotificationMessage.displayNotification = this.element;

    }
    remove() {
        if (this.element) this.element.remove();
    }
    destroy() {
        this.remove();
        this.element = null;
        NotificationMessage.displayNotification = null;
    }
}