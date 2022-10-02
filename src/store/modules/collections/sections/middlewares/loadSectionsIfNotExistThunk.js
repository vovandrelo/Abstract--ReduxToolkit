import { selectSectionsIds } from "../selectors.js";
import { sectionsActions } from "../index.js";

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
export function loadSectionsIfNotExistThunk() {
    // Результатом работы являет не объект, а функция, принимающая следующие аргументы:
    // Аргумент №1: dispatch, предназначен для выполнения дейсвий.
    // Аргумент №2: getState, предназначен для доступа к глобальному объекту состояний.
    return function (dispatch, getState) {
        if (selectSectionsIds(getState())?.length > 0) {
            return;
        }

        dispatch(sectionsActions.startLoading());

        fetch("http://localhost:3001/sections")
        .then(res => res.json())
        .then(sections => dispatch(sectionsActions.successLoading({sections})))
        .catch(err => dispatch(sectionsActions.failedLoading()));
    }
}