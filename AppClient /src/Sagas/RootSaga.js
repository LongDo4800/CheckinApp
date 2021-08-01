import { call, all} from "redux-saga/effects";

import { watchFetchUer} from "./LoginSaga";

export default function* RootSaga() {
    yield call(
        watchFetchUer,
    )
}