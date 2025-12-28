/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
const origin = import.meta.env.VITE_API_ORIGIN || 'https://larek-api.nomoreparties.co';

// ВАЖНО: Добавляем путь /api/weblarek к базовому URL
export const API_URL = `${origin}/api/weblarek`; 
export const CDN_URL = `${origin}/content/weblarek`;
/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {

};

