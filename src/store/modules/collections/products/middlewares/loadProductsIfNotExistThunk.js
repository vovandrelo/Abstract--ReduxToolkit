import { selectSectionProductsIdsById } from "../../sections/selectors.js";
import { selectProductsIds } from "../selectors.js";
import { productsActions } from "../index.js";

// Сетевые запросы в Rudux обрабытываются с помощью встроенных middleware thunk по следующему алгоритму:
// 1. Создаётся действие обработки сетевого запроса, результатом работы которого является ффункция, а не
//    объект.
// 2. Созданное действие вызывается непосредственно в dispatch.
// 3. Результатом вызова действия является другая функция, которая и передаётся в сам dispatch.
// 4. В момент пересылки действия из dispatch в rootReducer встроенная middleware thunk выполняет проверку
//    на тип действия.
// 5. Если тип действия - function, то действие является thunk-ой => дальнейший путь действия прерывается
//    и запускатеся обработка сетевого запроса с необходимыми аргументами.
// 6. Если тип действия - object, то действие является стандартным => оно пропускается дальше через
//    остальные middleware и попадает в rootReducer.


// Создание сетефого запроса:
export function loadProductsIfNotExistThunk(sectionId) {
    // Результатом работы являет не объект, а функция, принимающая следующие аргументы:
    // Аргумент №1: dispatch, предназначен для выполнения дейсвий.
    // Аргумент №2: getState, предназначен для доступа к глобальному объекту состояний.
    return function (dispatch, getState) {
        const productsIds = selectSectionProductsIdsById(getState(), sectionId);
        const uploadedProdsIds = selectProductsIds(getState());
        if (productsIds?.length === 0 || (uploadedProdsIds?.length > 0 && productsIds.every(id => uploadedProdsIds.includes(id)))) {
            return
        }

        dispatch(productsActions.startLoading());

        fetch(`http://localhost:3001/products?sectionId=${sectionId}`)
        .then(res => res.json())
        .then(products => dispatch(productsActions.successLoading({ products })))
        .catch(err => dispatch(productsActions.failedLoading()))
    }
}