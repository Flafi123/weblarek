import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";
import { IOrderForm } from "../../../types";
import { PaymentMethod } from "../../../types";

export class FormOrder extends Form<IOrderForm> {
    protected _title: HTMLElement;
    protected _buttonsOrder: HTMLButtonElement[];
    protected _buttonSubmit: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._title = ensureElement<HTMLElement>('.modal__title', container);
        this._buttonSubmit = ensureElement<HTMLButtonElement>('.order__button', container);
        this._buttonsOrder = Array.from(container.querySelectorAll('.button_alt'));

        this._buttonsOrder.forEach(button => {
            button.addEventListener('click', () => {
                this.events.emit('payment:change', { target: button.name });
            });
        });
    }

    set title(value: string) {
        this._title.textContent = value;
    }

    set payment(value: PaymentMethod) {
        this.togglePaymentMethod(value);
    }

    togglePaymentMethod(name: string) {
        this._buttonsOrder.forEach(button => {
            button.classList.toggle('button_alt-active', button.name === name);
        });
    }
}