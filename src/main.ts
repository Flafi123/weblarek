import './scss/styles.scss';

import { EventEmitter } from './components/base/Events';
import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Api } from './components/base/Api';
import { PaymentMethod } from './types/index';
import { CardInGallery } from './components/views/Card/CardInGallery';
import { CardInPreview } from './components/views/Card/CardInPreview';
import { CardInBasket } from './components/views/Card/CardInBasket';
import { Basket as BasketView } from './components/views/BasketС';
import { Header } from './components/views/Header';
import { Modal } from './components/views/Modal';
import { FormOrder } from './components/views/Form/FormOrder';
import { FormContacts } from './components/views/Form/FormContacts';
import { ProductCatalog } from './components/ProductCatalog';
import { BasketK as BasketModel } from './components/Basket';
import { Buyer } from './components/Buyer';
import { IProduct } from './types/index';
import { ModalSuccess } from './components/views/ModalSuccess';

// Инициализация базовых объектов

const events = new EventEmitter();
const baseApi = new Api(API_URL);
const larekApi = new LarekApi(CDN_URL, baseApi);

const catalogModel = new ProductCatalog(events);
const basketModel = new BasketModel();
const buyerModel = new Buyer();

// Контейнеры и Шаблоны 

const headerContainer = ensureElement<HTMLElement>('.header');
const catalogContainer = ensureElement<HTMLElement>('.gallery');
const modalContainer = ensureElement<HTMLElement>('#modal-container');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Инициализация компонентов View

const modal = new Modal(modalContainer, events);
const header = new Header(events, headerContainer);
const basketView = new BasketView(cloneTemplate(basketTemplate), events);
const orderForm = new FormOrder(cloneTemplate(orderTemplate), events);
const contactsForm = new FormContacts(cloneTemplate(contactsTemplate), events);


function isString(value: any): value is string {
    return typeof value === 'string';
}

function validateOrderForm() {
    const errors = buyerModel.validate();
    const isValid = !errors.address && !errors.payment;
    orderForm.render({
        valid: isValid,
        errors: [errors.payment, errors.address].filter(isString)
    });
}

function validateContactsForm() {
    const errors = buyerModel.validate();
    const isValid = !errors.email && !errors.phone;
    contactsForm.render({
        valid: isValid,
        errors: Object.values(errors).filter(isString)
    });
}

//Обработка событий Presenter

// Отрисовка каталога 
events.on('items:changed', () => {
    catalogContainer.replaceChildren(...catalogModel.getItems().map((item) => {
        const card = new CardInGallery(cloneTemplate(cardCatalogTemplate), events, {
            onClick: () => events.emit('card:select', item)
        });
        return card.render(item);
    }));
});

// Открытие превью товара
events.on('card:select', (item: IProduct) => {
    const cardPreview = new CardInPreview(cloneTemplate(cardPreviewTemplate), events, {
        onClick: () => events.emit('card:toggle-basket', item)
    });

    modal.render({
        content: cardPreview.render({
            buttonText: basketModel.contains(item.id) ? 'Удалить из корзины' : 'В корзину',
            ...item
        })
    });
});

// Логика добавления/удаления из превью
events.on('card:toggle-basket', (item: IProduct) => {
    if (basketModel.contains(item.id)) {
        basketModel.remove(item.id);
        events.emit('card:select', item);
    } else {
        basketModel.add(item);
        modal.close(); 
    }
    
    header.counter = basketModel.getAmount();
    events.emit('basket:data-changed');
});

// Открытие корзины 
events.on('basket:open', () => {
    events.emit('basket:render');
});

// Удаление товара из корзины
events.on('basket:item-remove', (item: IProduct) => {
    basketModel.remove(item.id);
    header.counter = basketModel.getAmount();
    events.emit('basket:render');
});

// Отрисовка контента корзины
events.on('basket:render', () => {
    const basketItems = basketModel.getItems().map((item, idx) => {
        const card = new CardInBasket(cloneTemplate(cardBasketTemplate), events, {
            onClick: () => events.emit('basket:item-remove', item)
        });
        return card.render({
            title: item.title,
            price: item.price,
            index: idx + 1
        });
    });

    modal.render({
        content: basketView.render({
            items: basketItems,
            total: basketModel.getTotalPrice()
        })
    });
});

// Modal

events.on('modal:open', () => events.emit('ui:block-scroll'));
events.on('modal:close', () => events.emit('ui:unblock-scroll'));
events.on('ui:block-scroll', () => { document.body.style.overflow = 'hidden'; });
events.on('ui:unblock-scroll', () => { document.body.style.overflow = 'unset'; });

// 1 шаг оформления заказа

events.on('order:open', () => {
    buyerModel.clearData();
    buyerModel.setData({ payment: 'card' as PaymentMethod }); 
    modal.render({
        content: orderForm.render({
            payment: 'card' as PaymentMethod,
            address: '',
            valid: false,
            errors: []
        })
    });
    validateOrderForm();
});

// Переключение способа оплаты
events.on('payment:change', (data: { target: PaymentMethod }) => {
    buyerModel.setData({ payment: data.target });
    orderForm.payment = data.target;
    validateOrderForm();
});

events.on('order.address:change', (data: { value: string }) => {
    buyerModel.setData({ address: data.value });
    validateOrderForm();
});


// 2 шаг оформления заказа

events.on('contacts.email:change', (data: { value: string }) => {
    buyerModel.setData({ email: data.value });
    validateContactsForm(); 
});

events.on('contacts.phone:change', (data: { value: string }) => {
    buyerModel.setData({ phone: data.value });
    validateContactsForm(); 
});

events.on('order:submit', () => {
    modal.render({
        content: contactsForm.render({
            email: '',
            phone: '',
            valid: false,
            errors: []
        })
    });
});

// 3 шаг оформления заказа

events.on('contacts:submit', () => {
    const orderData = {
        ...buyerModel.getData(),
        total: basketModel.getTotalPrice(),
        items: basketModel.getItems().map(item => item.id)
    };

    larekApi.orderProducts(orderData)
        .then((result) => {
            const success = new ModalSuccess(cloneTemplate(successTemplate), {
                onClick: () => events.emit('success:close')
            });

            modal.render({
                content: success.render({
                    title: 'Заказ оформлен',
                    description: `Списано ${result.total} синапсов`
                })
            });

            basketModel.clear();
            buyerModel.clearData();
            header.counter = 0;
        })
        .catch(err => console.error(err));
});

events.on('success:close', () => {
    modal.close();
});

// Загрузка

larekApi.getProductList()
    .then((products) => catalogModel.setItems(products))
    .catch(err => console.error('Ошибка инициализации:', err));