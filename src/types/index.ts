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

export interface IBuyer {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
} 

export type PaymentMethod = 'card' | 'cash';

export interface IProductResponse {
  total: number;
  items: IProduct[];
}

export interface IOrder extends IBuyer {
  total: number;
  items: string[]; 
}

export interface IOrderResult {
  id: string;
  total: number;
}

export interface Header{
  backetButton: HTMLButtonElement;
  counterElement: HTMLElement;
  setCounter(value: number): void;
}

export interface HeaderData extends Header{
  counter: number;
}

export interface Gallery{
  catalogElement: HTMLElement;
  setCatalog(items: HTMLElement[]): void;
}

export interface GalleryData extends Gallery {
  catalog: HTMLElement;
}

export interface CardInGallery {
  cardElementinGallery: HTMLElement;
}

export interface CardInGalleryData extends CardInGallery {
  category: string;
  title: string;
  image: string;
  price: number;
}

export interface Basket{
  basketElement: HTMLElement;
  setBasket(items: HTMLElement[]): void;
}

export interface BasketData extends Basket {
  basket: HTMLElement;
}

export interface CardInBasket {
  cardElementinBasket: HTMLElement;
  deleteButton: HTMLButtonElement;
}

export interface CardInBasketData extends CardInBasket {
  id: number;
  title: string;
  price: number;
}

export interface FormСoise {
    
}


