import { Component } from "../../Component";
import { ensureElement } from "../../../../utils/utils";
import { IEvents } from "../../Events";

interface ICard {
    title: string;
    price: number | null;
    category?: string; 
    image?: string;   
    description?: string; 
    buttonText?: string; 
    isInBasket?: boolean; 
    index?: number;
}

export class Card extends Component<ICard> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);
    }

    set title(value: string) {
        this._title.textContent = value;
    }

    set price(value: number | null) {
    this._price.textContent = (value !== null) 
        ? `${value} синапсов` 
        : 'Бесценно';
}
}