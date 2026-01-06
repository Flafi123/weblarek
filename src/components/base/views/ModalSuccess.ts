import { Component } from "../Component";
import { ensureElement } from "../../../utils/utils";

interface IModalSuccessData {
    title: string;
    description: string;
}

interface IModalSuccessActions {
    onClick: () => void;
}

export class ModalSuccess extends Component<IModalSuccessData> {
    protected title: HTMLElement;
    protected description: HTMLElement;
    protected buttonClose: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IModalSuccessActions) {
        super(container);

        this.title = ensureElement<HTMLElement>('.order-success__title', container);
        this.description = ensureElement<HTMLElement>('.order-success__description', container);
        this.buttonClose = ensureElement<HTMLButtonElement>('.order-success__close', container);

        if (actions?.onClick) {
            this.buttonClose.addEventListener('click', actions.onClick);
        }
    }

    setTitle(value: string) {
        this.title.textContent = value;
    }

    setText(value: string) {
        this.description.textContent = value;
    }
}