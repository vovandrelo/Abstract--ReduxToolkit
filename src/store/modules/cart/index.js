import { createSlice } from "@reduxjs/toolkit";


//==================================================== ОПИСАНИЕ МОДУЛЯ CART ====================================================\\

// CreateSlice - это функция, позволяющая создавать описание модуля. Она объединяет в себе реализацию reducer-а и action-ов.
export const cartSlice = createSlice({
    // Название модуля:
    name: "cart",

    // Начальное состояние модуля:
    initialState: {},

    // Reducer модуля представляет собой объект, где каждый ключ является названием обрабатываемого действия, а значение -
    // функцией, которая это действие реализует. Используемые аргументы:
    // 1. Новый объект состояния (для данного модуля), который можно изменять напрямую.
    // 2. Совершённое действие, из которого обычно сразу извлекаются полезные данные с помощью деструктуризации.
    reducers: {
        addProduct: (state, { payload: { productId } }) => {
            const productCount = state[productId]?.count;
            state[productId] = {
                count: (productCount || 0) + 1
            }
        },
        removeProduct: (state, { payload: { productId } }) => {
            const productCount = state[productId]?.count;
            if (!productCount) {
                return;
            } else if (productCount === 1) {
                delete state[productId]
            } else {
                state[productId] = {
                    count: productCount - 1
                }
            }
        },
    }
})

// На основе названий ключей Reducer-а автоматически создаются названия действий, которые будут храниться в
// <muduleName>Slice.actions и использоваться в дальнейшем в dispatch-е.
export const cartActions = cartSlice.actions;