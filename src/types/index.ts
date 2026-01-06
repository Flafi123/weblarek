export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
} 

export interface IProductResponse {
    total: number;
    items: IProduct[];
}

export type PaymentMethod = 'card' | 'cash';

export interface IBuyer {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
} 

export interface IOrder extends IBuyer {
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export interface IAppState {
    catalog: IProduct[];
    basket: IProduct[];
    preview: string | null;
    order: Partial<IOrder>; 
    loading: boolean;
}

export interface IFormInputChangeEvent {
    field: keyof IOrder;
    value: string;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface IFormChoice {
    payment: PaymentMethod;
    address: string;
    errors: string;
}