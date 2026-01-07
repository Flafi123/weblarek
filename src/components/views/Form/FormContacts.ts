import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

export class FormContacts extends Form<any> {
    protected buttonSubmit: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.buttonSubmit = ensureElement<HTMLButtonElement>('.button', container);
    }
}