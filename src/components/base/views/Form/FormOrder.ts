import { ensureElement } from "../../../../utils/utils";
import { IEvents } from "../../Events";
import { Form } from "./Form";

export class FormOrder extends Form<any> {
    protected title: HTMLElement;
    protected buttonsOrder: HTMLButtonElement[];
    protected buttonSubmit: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.title = ensureElement<HTMLElement>('.modal__title', container);
        this.buttonSubmit = ensureElement<HTMLButtonElement>('.order__button', container);
        this.buttonsOrder = Array.from(container.querySelectorAll('.button_alt'));

        this.buttonsOrder.forEach(button => {
            button.addEventListener('click', () => {
                this.togglePaymentMethod(button.name);
                this.events.emit('payment:change', { target: button.name });
            });
        });
    }

    setTitle(value: string) {
        this.title.textContent = value;
    }

    togglePaymentMethod(name: string) {
        this.buttonsOrder.forEach(button => {
            button.classList.toggle('button_alt-active', button.name === name);
        });
    }
}