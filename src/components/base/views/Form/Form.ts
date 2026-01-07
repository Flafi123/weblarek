import { Component } from "../../Component";
import { ensureElement, createElement } from "../../../../utils/utils";
import { IEvents } from "../../Events";

// Интерфейс состояния формы
interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends Component<IFormState> {
    protected _errors: HTMLElement;
    protected _submit: HTMLButtonElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this._errors = ensureElement<HTMLElement>('.form__errors', container);
        this._submit = ensureElement<HTMLButtonElement>('button[type="submit"]', container);

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            const formName = (this.container as HTMLFormElement).name;
            this.events.emit(`${formName}.${String(field)}:change`, { field, value });
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            const formName = (this.container as HTMLFormElement).name;
            this.events.emit(`${formName}:submit`);
        });
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    set errors(value: string[]) {
        this._errors.textContent = value.join(', ');
    }

    render(data: Partial<T & IFormState>): HTMLElement {
        const { valid, errors, ...formInputs } = data;
        super.render({ valid, errors });
        Object.assign(this, formInputs);
        
        return this.container;
    }
    
    clear() {
        (this.container as HTMLFormElement).reset();
    }
}