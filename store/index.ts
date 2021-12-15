import { UserData } from 'store/slices/user-slice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { SagaMiddleware } from '@redux-saga/core';
import { watcherSaga } from './sagas/root-saga';
import userReducer from './slices/user-slice';
import appReducer from './slices/app-slice';
import logger from 'redux-logger';

// TODO: correctly type the sagaMiddleware, try to make it not like `SagaMiddleware<object>`, not sure SagaMiddleware<UserData> works.
const sagaMiddleware: SagaMiddleware<UserData> = createSagaMiddleware();

const rootReducer = combineReducers({
  app: appReducer.reducer,
  user: userReducer.reducer,
});

const store = configureStore({
  reducer: rootReducer,

  // https://redux-toolkit.js.org/usage/usage-with-typescript#correct-typings-for-the-dispatch-type
  // above doc suggests using the .concat(...) and .prepend(...) methods of the MiddlewareArray returned by getDefaultMiddleware() instead of [...spread] for Typescript
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false })
      // prepend and concat calls can be chained
      .concat(sagaMiddleware, logger),
});

sagaMiddleware.run(watcherSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
