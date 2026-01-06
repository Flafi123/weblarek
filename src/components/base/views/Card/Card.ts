import { Component } from "../../Component";
import { ensureElement } from "../../../../utils/utils";
import { IEvents } from "../../Events";

interface ICard {
    title: string;
    price: number | null;
}

export class Card extends Component<ICard> {
    public title: HTMLElement;
    protected price: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.title = ensureElement<HTMLElement>('.card__title', container);
        this.price = ensureElement<HTMLElement>('.card__price', container);
    }

    setTitle(value: string) {
        this.title.textContent = value;
    }

    setPrice(value: number | null) {
        this.price.textContent = value ? `${value} синапсов` : 'Бесценно';
    }
}