import { IBuyer, PaymentMethod } from '../types';

export type BuyerErrors = Partial<Record<keyof IBuyer, string>>;

export class Buyer {
  protected _payment: PaymentMethod | null = null;
  protected _address: string = '';
  protected _phone: string = '';
  protected _email: string = '';

  // Сохранение данных покупателя
  setData(data: Partial<IBuyer>): void {
    Object.assign(this, {
      _payment: data.payment !== undefined ? data.payment : this._payment,
      _address: data.address !== undefined ? data.address : this._address,
      _phone: data.phone !== undefined ? data.phone : this._phone,
      _email: data.email !== undefined ? data.email : this._email,
    });
  }

  // Получение всех данных
  getData(): IBuyer {
    return {
      payment: this._payment as PaymentMethod,
      address: this._address,
      phone: this._phone,
      email: this._email,
    };
  }

  // Очистка данных
  clearData(): void {
    this._payment = null;
    this._address = '';
    this._phone = '';
    this._email = '';
  }

  // Валидация: возвращает объект с текстом ошибок для пустых полей
  validate(): BuyerErrors {
    const errors: BuyerErrors = {};

    if (!this._payment) {
      errors.payment = 'Необходимо указать вид оплаты';
    }
    if (!this._address || this._address.trim() === '') {
      errors.address = 'Необходимо указать адрес доставки';
    }
    if (!this._phone || this._phone.trim() === '') {
      errors.phone = 'Необходимо указать номер телефона';
    }
    if (!this._email || this._email.trim() === '') {
      errors.email = 'Необходимо указать email';
    }

    return errors;
  }
}