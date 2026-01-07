import { Card } from "./Card";
import { IEvents } from "../../Events"; 
import { ensureElement } from "../../../../utils/utils";

interface ICardInBasketActions {
    onClick: (event: MouseEvent) => void;
}

export class CardInBasket extends Card {
    protected _index: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents, actions?: ICardInBasketActions) {
        super(events, container); 

        this._index = ensureElement<HTMLElement>('.basket__item-index', container);
        this._button = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        if (actions?.onClick) {
            this._button.addEventListener('click', actions.onClick);
        }
    }

    set index(value: number) {
        this._index.textContent = value.toString();
    }
}