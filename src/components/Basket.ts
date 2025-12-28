import { IProduct } from "../types"
export class Basket {
    protected _items: IProduct[] = [];

    // Получение списка товаров
    getItems(): IProduct[] {
        return this._items;
    }

    // Добавление товара
    add(product: IProduct): void {
        if (!this.contains(product.id)) {
            this._items.push(product);
        }
    }

    // Удаление товара по id
    remove(id: string): void {
        this._items = this._items.filter(item => item.id !== id);
    }

    // Очистка корзины
    clear(): void {
        this._items = [];
    }

    // Сумма цен всех товаров
    getTotalPrice(): number {
        return this._items.reduce((sum, item) => sum + (item.price || 0), 0);
    }

    // Количество товаров
    getAmount(): number {
        return this._items.length;
    }

    // Проверка наличия
    contains(id: string): boolean {
        return this._items.some(item => item.id === id);
    }
}