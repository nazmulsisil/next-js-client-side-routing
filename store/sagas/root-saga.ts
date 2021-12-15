import { takeLatest } from 'redux-saga/effects';
import { checkUser, getUser, removeUser } from 'store/slices/user-slice';
import {
  handleCheckUser,
  handleGetUser,
  handleRemoveUser,
} from './handlers/user';

export function* watcherSaga() {
  yield takeLatest(getUser.type, handleGetUser);
  yield takeLatest(checkUser.type, handleCheckUser);
  yield takeLatest(removeUser.type, handleRemoveUser);
}
