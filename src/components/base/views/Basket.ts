import { Component } from "../Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../Events";

interface IBasket {
    items: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasket> {
    protected list: HTMLElement;
    protected totalElement: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.list = ensureElement<HTMLElement>('.basket__list', container);
        this.totalElement = ensureElement<HTMLElement>('.basket__price', container);
        this.button = ensureElement<HTMLButtonElement>('.basket__button', container);

        this.button.addEventListener('click', () => {
            this.events.emit('order:open');
        });
    }

    set items(items: HTMLElement[]) {
        if (items.length > 0) {
            this.list.replaceChildren(...items);
            this.button.disabled = false;
        } else {
            this.list.innerHTML = '<p>Корзина пуста</p>';
            this.button.disabled = true;
        }
    }

    set total(value: number) {
        this.totalElement.textContent = `${value} синапсов`;
    }
}