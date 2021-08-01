import {
  FETCH_FAILED,
  FETCH_SUCCSES,
  FETCH_USER,
} from "../Redux/Actions/ActionTypes";
import { put, takeLatest } from "redux-saga/effects";
import { Login } from "./Login";

function* fetchUser() {
  try {
    const reducerUser = yield Login.getUser();
    yield put({ type: FETCH_SUCCSES, user: reducerUser });
  } catch (error) {
    yield put({ type: FETCH_FAILED, error: error });
  }
}

export function* watchFetchUer() {
  yield takeLatest(FETCH_USER, fetchUser);
}
