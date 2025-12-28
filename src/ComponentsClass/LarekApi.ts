import { Api } from '../components/base/Api';
import { IProduct, IOrder, IOrderResult, IProductResponse } from '../types';

export interface ILarekApi {
    getProductList: () => Promise<IProduct[]>;
    orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

export class LarekApi extends Api implements ILarekApi {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    // Получаем список товаров
    getProductList(): Promise<IProduct[]> {
        // Явно указываем тип возвращаемых данных <IProductResponse>
        return this.get<IProductResponse>('/product').then((data) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    // Отправляем заказ
    orderProducts(order: IOrder): Promise<IOrderResult> {
        // Явно указываем тип ответа сервера <IOrderResult>
        return this.post<IOrderResult>('/order', order).then(
            (data) => data
        );
    }
}