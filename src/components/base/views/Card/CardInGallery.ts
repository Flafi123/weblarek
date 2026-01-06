import { Card } from "./Card";
import { IEvents } from "../../Events"; 
import { ensureElement } from "../../../../utils/utils";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class CardInGallery extends Card {
    protected category: HTMLElement;
    protected image: HTMLImageElement;

    constructor(container: HTMLElement, events: IEvents, actions?: ICardActions) {
        super(events, container); 
        this.category = ensureElement<HTMLElement>('.card__category', container);
        this.image = ensureElement<HTMLImageElement>('.card__image', container);

        if (actions?.onClick) {
            container.addEventListener('click', actions.onClick);
        }
    }

    setCategory(value: string) {
        this.category.textContent = value;
    }

    setCardImage(value: string) {
        super.setImage(this.image, value, this.title.textContent || '');
    }
}