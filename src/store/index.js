import { loggerMiddleware } from "./middlewares/logger.js";
import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./modules/cart/index.js";
import { sectionsSlice } from "./modules/collections/sections/index.js";
import { productsSlice } from "./modules/collections/products/index.js";

// Основная проблема Redux - большое количество однотипного кода. Toolkit Позволяет облегчить написание приложений на
// React + Redux, а так же максимально снижает повторение кода. 

const rootInitialState = {
    collections: {}
};


const rootReducer = (state = rootInitialState, action) => {
    // Для использования reducer-а модуля необходимо обратиться к соответствующему свойству ".reducer":
    return {
        collections: {
            sections: sectionsSlice.reducer(state.collections.sections, action),
            products: productsSlice.reducer(state.collections.products, action),
        },
        cart: cartSlice.reducer(state.cart, action)
    }
}


// Для конфигурации stor-а вместо createSelector рекомендуется использовать функцию configurateStore, она выполняет
// аналогичные задачи, но в более удобном формате:
export const store = configureStore({
    // Свойство "reducer" позволяет подключить к Store-у необходимый reducer:
    reducer: rootReducer,

    // Свойство "middleware" позволяет подключить к Store-у необходимые middleware. Если планируется использовать
    // только собственные middleware, то они передаются как массив функций. Если планируется использовать как
    // встроенные, так и собственные middleware, то свойству "middleware" присваивается функция, результатом
    // работы которой являются объединённые массивы встроенных и собственных middleware:
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        loggerMiddleware,
    ]),
    // Одной из наиболее популярных встроенных middleware является thunk, она облегчает работу с сетевыми запросами.

    // Свойство "devTools" позволяет подключить специальный механизм, позволяющий в реальном времени отслеживать
    // текущее состояние Store-а и выполняемые над ним действия.
    // Для использования devTools необходимо также установить специальное расширение для браузера:
    // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ru
    devTools: true,
});