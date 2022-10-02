import { createSelector } from "@reduxjs/toolkit";

export const selectCartModuleState = (state) => state.cart;
export const selectCartItemsIds = (state) => Object.keys(selectCartModuleState(state));
export const selectCartItemCountById = (state, itemId) => selectCartModuleState(state)[itemId]?.count;

// При каждом измененеии ГС вызываются все selector-ы подписчиков => если selector selectCartItemsIds был
// где-либо использован, то он будет вызван. А так как в нём испоьлзуется Object.keys, то при каждом его
// вызове будет создан новый массив => при любом действии selectCartItemsIds будет выдавать новый
// массив и вызывать лишний перерендер.