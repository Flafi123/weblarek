import { Card } from "./Card";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { categoryMap } from "../../../utils/constants";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class CardInPreview extends Card {
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;

    constructor(container: HTMLElement, events: IEvents, actions?: ICardActions) {
        super(events, container);

        this._description = ensureElement<HTMLElement>('.card__text', container);
        this._button = ensureElement<HTMLButtonElement>('.card__button', container);
        this._category = ensureElement<HTMLElement>('.card__category', container);
        this._image = ensureElement<HTMLImageElement>('.card__image', container);

        if (actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        }
    }

    set description(value: string) {
        this._description.textContent = value;
    }

    set category(value: string) {
        this._category.textContent = value;
        const categoryClass = categoryMap[value as keyof typeof categoryMap] || categoryMap['другое'];
        this._category.className = `card__category ${categoryClass}`;
    }

    set image(value: string) {
        super.setImage(this._image, value, this._title.textContent || '');
    }

    set buttonText(value: string) {
        if (this._button) {
            this._button.textContent = value;
        }
    }

    set price(value: number | null) {
        super.price = value;

        if (value === null) {
            this._button.disabled = true;
            this.buttonText = 'Недоступно';
        } else {
            this._button.disabled = false;
        }
    }
}