import { IProduct } from "../types"
import { IEvents } from "./base/Events";
export class ProductCatalog {

    protected _items: IProduct[] = [];
    protected _preview: IProduct | null = null;
    protected events: IEvents;

    constructor(events: IEvents) { 
        this.events = events;
    }

    setItems(items: IProduct[]): void {
        this._items = items;
        this.events.emit('items:changed');
    }

    getItems(): IProduct[] {
        return this._items;
    }

    getProduct(id: string): IProduct | undefined {
        return this._items.find(item => item.id === id);
    }

    setPreview(item: IProduct): void {
        this._preview = item;
    }

    getPreview(): IProduct | null {
        return this._preview;
    }
}
