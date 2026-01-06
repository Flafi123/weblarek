import { Component } from "../../Component";
import { ensureElement } from "../../../../utils/utils";
import { IEvents } from "../../Events";

export class Form<T> extends Component<T> {
    protected formTitle: HTMLElement;
    protected formInput: HTMLInputElement;
    protected textErrors: HTMLElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.formTitle = ensureElement<HTMLElement>('.modal__title.form__label', container);
        this.formInput = ensureElement<HTMLInputElement>('.form__input', container);
        this.textErrors = ensureElement<HTMLElement>('.form__errors', container);

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.events.emit(`${container.name}.${String(field)}:change`, { field, value });
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${container.name}:submit`);
        });
    }

    setFormTitle(value: string) {
        this.formTitle.textContent = value;
    }

    setFormInput(value: string) {
        this.formInput.value = value;
    }

    setTextErrors(value: string) {
        this.textErrors.textContent = value;
    }
}