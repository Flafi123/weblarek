import { IProduct, IOrder, IOrderResult, IProductResponse, IApi } from '../types';

export interface ILarekApi {
    getProductList: () => Promise<IProduct[]>;
    orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

export class LarekApi implements ILarekApi {
    private _api: IApi;
    readonly cdn: string;

    constructor(cdn: string, api: IApi) {
        this.cdn = cdn;
        this._api = api;
    }

    // Получаем список товаров
    getProductList(): Promise<IProduct[]> {
        return this._api.get<IProductResponse>('/product').then((data) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    // Отправляем заказ
    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this._api.post<IOrderResult>('/order', order).then(
            (data) => data
        );
    }
}