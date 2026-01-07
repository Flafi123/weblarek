import { Card } from "./Card";
import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { categoryMap } from "../../../utils/constants";


interface ICardInGalleryActions {
    onClick: (event: MouseEvent) => void;
}

export class CardInGallery extends Card {
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;

    constructor(container: HTMLElement, events: IEvents, actions?: ICardInGalleryActions) {
        super(events, container);
        this._category = ensureElement<HTMLElement>('.card__category', container);
        this._image = ensureElement<HTMLImageElement>('.card__image', container);

        if (actions?.onClick) {
            container.addEventListener('click', actions.onClick);
        }
    }

    set category(value: string) {
        this._category.textContent = value;
        this._category.className = 'card__category';
        const categoryClass = categoryMap[value as keyof typeof categoryMap] || categoryMap['другое'];
        this._category.classList.add(categoryClass);
    }

    set image(value: string) {
        super.setImage(this._image, value, this._title.textContent || '');
    }
}