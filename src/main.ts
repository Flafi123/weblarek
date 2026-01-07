import './scss/styles.scss';

import { EventEmitter } from './components/base/Events';
import { LarekApi } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Api } from './components/base/Api';
import { PaymentMethod } from './types/index';
import { CardInGallery } from './components/base/views/Card/CardInGallery';
import { CardInPreview } from './components/base/views/Card/CardInPreview';
import { CardInBasket } from './components/base/views/Card/CardInBasket';
import { Basket as BasketView } from './components/base/views/BasketС';
import { Header } from './components/base/views/Header';
import { Modal } from './components/base/views/Modal';
import { FormOrder } from './components/base/views/Form/FormOrder';
import { FormContacts } from './components/base/views/Form/FormContacts';
import { ProductCatalog } from './components/ProductCatalog';
import { BasketK as BasketModel } from './components/Basket';
import { Buyer } from './components/Buyer';
import { IProduct } from './types/index';
import { ModalSuccess } from './components/base/views/ModalSuccess';


// --- Инициализация базовых объектов ---

const events = new EventEmitter();
const baseApi = new Api(API_URL);
const larekApi = new LarekApi(CDN_URL, baseApi);

// Модели данных (как в ваших тестах)
const catalogModel = new ProductCatalog();
const basketModel = new BasketModel();
const buyerModel = new Buyer();

// --- Контейнеры и Шаблоны ---

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

// --- Инициализация компонентов представления (View) ---

const modal = new Modal(modalContainer, events);
const header = new Header(events, headerContainer);
const basketView = new BasketView(cloneTemplate(basketTemplate), events);
const orderForm = new FormOrder(cloneTemplate(orderTemplate), events);
const contactsForm = new FormContacts(cloneTemplate(contactsTemplate), events);

// --- Обработка событий (Presenter) ---

// Отрисовка каталога
events.on('items:changed', () => {
    const cardsHtml = catalogModel.getItems().map((item) => {
        const card = new CardInGallery(cloneTemplate(cardCatalogTemplate), events, {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            title: item.title,
            category: item.category,
            image: item.image,
            price: item.price
        });
    });
    catalogContainer.replaceChildren(...cardsHtml);
});

// Предпросмотр товара
events.on('card:select', (item: IProduct) => {
    const cardPreview = new CardInPreview(cloneTemplate(cardPreviewTemplate), events, {
        onClick: () => {
            basketModel.add(item); 
            header.counter = basketModel.getAmount(); 
            modal.close();
        }
    });

    modal.render({
        content: cardPreview.render({
            title: item.title,
            image: item.image,
            category: item.category,
            description: item.description,
            price: item.price,
            buttonText: basketModel.contains(item.id) ? 'Уже в корзине' : 'В корзину'
        })
    });
});

// Открытие и отрисовка корзины
events.on('basket:open', () => {
    const basketItems = basketModel.getItems().map((item, idx) => {
        const card = new CardInBasket(cloneTemplate(cardBasketTemplate), events, {
            onClick: () => {
                basketModel.remove(item.id);
                header.counter = basketModel.getAmount(); 
                events.emit('basket:open'); 
            }
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

// Управление модалкой
events.on('modal:open', () => { document.body.style.overflow = 'hidden'; });
events.on('modal:close', () => { document.body.style.overflow = 'unset'; });

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

// Открытие первой формы заказа 
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


events.on('order.address:change', (data: { value: string }) => {
    buyerModel.setData({ address: data.value });
    validateOrderForm(); 
});

// Слушаем ввод email
events.on('contacts.email:change', (data: { value: string }) => {
    buyerModel.setData({ email: data.value });
    validateContactsForm(); 
});

// Слушаем ввод телефона
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

events.on('contacts:change', (data: { field: string, value: string }) => {
    buyerModel.setData({ [data.field]: data.value });
    validateContactsForm();
});

events.on('contacts:submit', () => {
    const orderData = {
        ...buyerModel.getData(),             
        total: basketModel.getTotalPrice(),
        items: basketModel.getItems().map(item => item.id)
    };

    larekApi.orderProducts(orderData)
    .then((result) => {
        const success = new ModalSuccess(cloneTemplate(successTemplate), {
            onClick: () => {
                modal.close();
            }
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

// Загрузка данных 

larekApi.getProductList()
    .then((products) => {
        catalogModel.setItems(products);
        events.emit('items:changed');
    })
    .catch(err => console.error('Ошибка загрузки:', err));