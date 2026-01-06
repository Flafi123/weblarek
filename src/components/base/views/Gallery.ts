import { Component } from "../Component";
import { IEvents } from "../Events";

interface IGallery {
    catalog: HTMLElement[]; 
}

export class Gallery extends Component<IGallery> {
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}