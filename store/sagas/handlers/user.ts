import { call, put } from 'redux-saga/effects';
import { setUser, UserData } from '../../slices/user-slice';
import { requestGetUser, requestRemoveUser } from '../requests/user';
import { SimpleEffect } from '@redux-saga/types';
import { CallEffect, PutEffect } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { handleCookieUser } from 'utils/handle-cookie-user';

// HIGHLIGHT: make sure the methods that saga calls are not being called from anywhere else to avoid infinite loops.

// for put effect PutEffect<PayloadAction<UserData>> can be used and import be like ---> import { AnyAction } from 'redux';
type WhatYouYield =
  | CallEffect<UserData>
  | PutEffect<PayloadAction<UserData | undefined>>;
type WhatYouReturn = void;

// what you accept as a return from requestGetUser
type WhatYouAccept = UserData;

export function* handleGetUser(
  action: PayloadAction<{}> // <--- {} empty object can be replaced with userCredentials required to call requestGetUser
): Generator<WhatYouYield, WhatYouReturn, WhatYouAccept> {
  try {
    const data = yield call(requestGetUser);
    yield put(setUser({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCheckUser(
  action: PayloadAction<{}> // <--- {} empty object can be replaced with userCredentials required to call requestGetUser
): Generator<
  | CallEffect<UserData | undefined>
  | PutEffect<PayloadAction<UserData | undefined>>,
  void,
  UserData | undefined
> {
  try {
    const userData = yield call(handleCookieUser);
    yield put(setUser(userData));
  } catch (error) {
    console.log(error);
  }
}

export function* handleRemoveUser(
  action: PayloadAction<undefined> // <--- {} empty object can be replaced with userC userCredentials required to call requestGetUser
): Generator<
  CallEffect<undefined> | PutEffect<PayloadAction<UserData | undefined>>,
  void,
  undefined
> {
  try {
    yield call(requestRemoveUser);
    yield put(setUser());
  } catch (error) {
    console.log(error);
  }
}
