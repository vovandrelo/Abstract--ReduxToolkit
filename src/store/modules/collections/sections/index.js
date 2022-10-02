import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUSES } from "../../../constants/loading-statuses.js";

//================================================== ОПИСАНИЕ МОДУЛЯ SECTIONS ==================================================\\

const initialState = {
    entities: {},
    ids: [],
    activeSectionId: "",
    loadingStatus: LOADING_STATUSES.notStarted,
}

// CreateSlice - это функция, позволяющая создавать описание модуля. Она объединяет в себе реализацию reducer-а и action-ов.
export const sectionsSlice = createSlice({
    // Название модуля:
    name: "sections",

    // Начальное состояние модуля:
    initialState,

    // Reducer модуля представляет собой объект, где каждый ключ является названием обрабатываемого действия, а значение -
    // функцией, которая это действие реализует. Используемые аргументы:
    // 1. Новый объект состояния (для данного модуля), который можно изменять напрямую.
    // 2. Совершённое действие, из которого обычно сразу извлекаются полезные данные с помощью деструктуризации.
    reducers: {
        startLoading: (state) => {
            state.loadingStatus = LOADING_STATUSES.inProgress;
        },
        successLoading: (state, { payload: { sections } }) => {
            state.entities = sections.reduce((acc, section) => {
                acc[section.id] = section;
                return acc;
            }, {});
            state.ids = sections.map(section => section.id);
            state.activeSectionId = sections[0].id;
            state.loadingStatus = LOADING_STATUSES.success;
        },
        failedLoading: (state) => {
            state.loadingStatus = LOADING_STATUSES.failed;
        },
        changeActiveSection: (state, { payload: { sectionId } }) => {
            state.activeSectionId = sectionId;
        },
    }
})

// На основе названий ключей Reducer-а автоматически создаются названия действий, которые будут храниться в
// <muduleName>Slice.actions и использоваться в дальнейшем в dispatch-е.
export const sectionsActions = sectionsSlice.actions;