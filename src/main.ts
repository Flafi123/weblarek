import './scss/styles.scss';
import { ProductCatalog } from './ComponentsClass/ProductCatalog';
import  { Basket } from './ComponentsClass/Basket';
import  { Buyer } from './ComponentsClass/Buyer';
import { apiProducts } from './utils/data';

const catalogModel = new ProductCatalog();
catalogModel.setItems(apiProducts.items);


// Проверяем получение одного товара по ID (берем ID первого товара из списка)
const firstProductId = apiProducts.items[0].id;
const product = catalogModel.getProduct(firstProductId);
console.log('2. Получение товара по ID:', product);

// Проверяем установку и получение превью
if (product) {
    catalogModel.setPreview(product);
    console.log('3. Товар в превью:', catalogModel.getPreview());
}


// 2. Тестируем Корзину (Basket)
const basketModel = new Basket();

// Добавляем пару товаров в корзину
if (product) basketModel.add(product);
const secondProduct = apiProducts.items[1];
if (secondProduct) basketModel.add(secondProduct);

console.log('4. Товары в корзине:', basketModel.getItems());
console.log('5. Количество товаров в корзине:', basketModel.getAmount());
console.log('6. Общая стоимость:', basketModel.getTotalPrice());

// Проверяем наличие товара и удаление
console.log('7. Есть ли первый товар в корзине?:', basketModel.contains(firstProductId));
basketModel.remove(firstProductId);
console.log('8. Количество после удаления одного товара:', basketModel.getAmount());


// 3. Тестируем Покупателя (Buyer)
const buyerModel = new Buyer();

// Частичное сохранение данных
buyerModel.setData({ address: 'Москва, ул. Полянка, д. 10' });
buyerModel.setData({ payment: 'card' }); 

// Проверяем, что данные не затерли друг друга
console.log('9. Данные покупателя (адрес и оплата):', buyerModel.getData());

// Проверка валидации (ожидаем ошибки для email и телефона, т.к. мы их не вводили)
const validationErrors = buyerModel.validate();
console.log('10. Ошибки валидации (должны быть email и phone):', validationErrors);

// Дозаполняем данные и проверяем снова
buyerModel.setData({ email: 'test@example.com', phone: '+7 999 000-00-00' });
console.log('11. Ошибки после полного заполнения (должен быть пустой объект):', buyerModel.validate());

// Очистка
buyerModel.clearData();
console.log('12. Данные покупателя после очистки:', buyerModel.getData());