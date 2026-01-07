import { Component } from "../Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../Events";

interface IHeader {
    counter: number 
}

export class Header extends Component<IHeader> {
    protected _counterElement: HTMLElement; 
    protected _basketButton: HTMLButtonElement;

    constructor (protected events: IEvents, container: HTMLElement) {
        super(container);
        this._counterElement = ensureElement<HTMLElement>('.header__basket-counter', container);
        this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);
        
        this._basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(value: number) {
        this._counterElement.textContent = String(value);
    }
}