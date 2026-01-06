import './scss/styles.scss';
import { ProductCatalog } from './components/ProductCatalog';
import { Basket } from './components/Basket';
import { Buyer } from './components/Buyer';
import { LarekApi } from './components/LarekApi'; 
import { API_URL, CDN_URL } from './utils/constants';
import { Api } from './components/base/Api';

// ИЗМЕНЕНИЕ: Логируем URL для проверки перед запросом
console.log('Попытка запроса к:', API_URL);

const baseApi = new Api(API_URL);
const larekApi = new LarekApi(CDN_URL, baseApi);

const catalogModel = new ProductCatalog();
const basketModel = new Basket();
const buyerModel = new Buyer();

larekApi.getProductList()
    .then((products) => {
        // ТЕСТ 1: Сохранение и проверка
        catalogModel.setItems(products);
        const savedItems = catalogModel.getItems();
        
        console.log('1. Получение массива товаров с сервера и проверка модели:');
        console.log(`- Получено с сервера: ${products.length} шт.`);
        console.log(`- Сохранено в модели: ${savedItems.length} шт.`);

        if (savedItems.length > 0) {
            console.log('✅ Данные в модели сохранены корректно');
            
            const firstProduct = savedItems[0]; 
            const secondProduct = savedItems[1] || savedItems[0];

            // ТЕСТ 2: Получение по ID
            const productFromModel = catalogModel.getProduct(firstProduct.id);
            console.log('2. Получение товара по ID:', productFromModel);

            // ТЕСТ 3: Превью
            catalogModel.setPreview(firstProduct);
            console.log('3. Товар в превью:', catalogModel.getPreview());

            // ТЕСТ 4-8: Корзина
            basketModel.add(firstProduct);
            basketModel.add(secondProduct);

            console.log('4. Товары в корзине:', basketModel.getItems());
            console.log('5. Количество товаров в корзине:', basketModel.getAmount());
            console.log('6. Общая стоимость:', basketModel.getTotalPrice());
            console.log('7. Есть ли первый товар в корзине?:', basketModel.contains(firstProduct.id));
            
            basketModel.remove(firstProduct.id);
            console.log('8. Количество после удаления одного товара:', basketModel.getAmount());
        }

        // ТЕСТ 9: Покупатель
        buyerModel.setData({ address: 'Москва, ул. Полянка, д. 10', payment: 'card' });
        console.log('9. Данные покупателя (адрес и оплата):', buyerModel.getData());

        // ТЕСТ 10: Валидация
        const validationErrors = buyerModel.validate();
        console.log('10. Ошибки валидации (должны быть email и phone):', validationErrors);

        // ТЕСТ 11: Полное заполнение
        buyerModel.setData({ email: 'test@example.com', phone: '+7 999 000-00-00' });
        console.log('11. Ошибки после полного заполнения (должен быть пустой объект):', buyerModel.validate());

        // ТЕСТ 12: Очистка (финальный лог)
        buyerModel.clearData();
        console.log('12. Данные покупателя после очистки:', buyerModel.getData());
    })
    .catch(err => {
        console.error('Ошибка инициализации данных:', err);
        console.warn('Если выше ошибка SyntaxError, значит сервер по адресу ' + API_URL + ' вернул HTML вместо JSON. Проверьте .env и ПЕРЕЗАПУСТИТЕ сервер (npm run dev)');
    });