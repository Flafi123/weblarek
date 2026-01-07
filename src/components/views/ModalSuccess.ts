import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IModalSuccessData {
    title: string;
    description: string;
}

interface IModalSuccessActions {
    onClick: () => void;
}

export class ModalSuccess extends Component<IModalSuccessData> {
    protected _title: HTMLElement;
    protected _description: HTMLElement;
    protected _buttonClose: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IModalSuccessActions) {
        super(container);

        this._title = ensureElement<HTMLElement>('.order-success__title', container);
        this._description = ensureElement<HTMLElement>('.order-success__description', container);
        this._buttonClose = ensureElement<HTMLButtonElement>('.order-success__close', container);

        if (actions?.onClick) {
            this._buttonClose.addEventListener('click', actions.onClick);
        }
    }

    set title(value: string) {
        this._title.textContent = value;
    }

    set description(value: string) {
        this._description.textContent = value;
    }
}