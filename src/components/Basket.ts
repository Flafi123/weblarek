import { IProduct } from "../types"
export class BasketK {
    protected items: IProduct[] = [];

    // Получение списка товаров
    getItems(): IProduct[] {
        return this.items;
    }

    // Добавление товара
    add(product: IProduct): void {
        if (!this.contains(product.id)) {
            this.items.push(product);
        }
    }

    // Удаление товара по id
    remove(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    // Очистка корзины
    clear(): void {
        this.items = [];
    }

    // Сумма цен всех товаров
    getTotalPrice(): number {
        return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
    }

    // Количество товаров
    getAmount(): number {
        return this.items.length;
    }

    // Проверка наличия
    contains(id: string): boolean {
        return this.items.some(item => item.id === id);
    }
}