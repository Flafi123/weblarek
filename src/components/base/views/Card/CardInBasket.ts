import { Card } from "./Card";
import { IEvents } from "../../Events"; 
import { ensureElement } from "../../../../utils/utils";

interface ICardInBasketActions {
    onClick: (event: MouseEvent) => void;
}

export class CardInBasket extends Card {
    protected index: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents, actions?: ICardInBasketActions) {
        super(events, container); 

        this.index = ensureElement<HTMLElement>('.basket__item-index', container);
        this.button = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        if (actions?.onClick) {
            this.button.addEventListener('click', actions.onClick);
        }
    }

    setIndex(value: number) {
        this.index.textContent = value.toString();
    }
    
    setButtonText(value: string) {
        this.button.textContent = value;
    }
}