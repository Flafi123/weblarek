import { Card } from "./Card";
import { IEvents } from "../../Events";
import { ensureElement } from "../../../../utils/utils";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class CardInPreview extends Card {
    protected description: HTMLElement;
    protected button: HTMLButtonElement;
    protected category: HTMLElement;
    protected image: HTMLImageElement;

    constructor(container: HTMLElement, events: IEvents, actions?: ICardActions) {
        super(events, container);

        this.description = ensureElement<HTMLElement>('.card__text', container);
        this.button = ensureElement<HTMLButtonElement>('.card__button', container);
        this.category = ensureElement<HTMLElement>('.card__category', container);
        this.image = ensureElement<HTMLImageElement>('.card__image', container);

        if (actions?.onClick) {
            this.button.addEventListener('click', actions.onClick);
        }
    }

    setDescription(value: string) {
        this.description.textContent = value;
    }

    setCategory(value: string) {
        this.category.textContent = value;
    }

    setCardImage(value: string) {
        super.setImage(this.image, value, this.title.textContent || '');
    }

    setButtonDisabled(value: boolean) {
        this.button.disabled = value;
    }

    setButtonText(value: string) {
        this.button.textContent = value;
    }
}