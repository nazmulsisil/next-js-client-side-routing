import { HandleRedirect } from 'components/handle-redirect';
import { Loader } from 'components/loader/Loader';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { useAppSelector } from 'hooks/use-app-selector';
import React, { useMemo } from 'react';
import { getUser, removeUser, selectUser } from 'store/slices/user-slice';

const Login = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const LoginButton = useMemo(() => {
    return (
      <button
        onClick={() => {
          dispatch(getUser());
        }}
      >
        <Loader loading={user.loading}>Login</Loader>
      </button>
    );
  }, [dispatch, user.loading]);

  const LogoutButton = useMemo(() => {
    return (
      <button onClick={() => dispatch(removeUser())}>
        <Loader loading={user.loading}>Logout</Loader>
      </button>
    );
  }, [dispatch, user.loading]);

  return (
    <HandleRedirect userTo="/">
      {user.data ? LogoutButton : LoginButton}
    </HandleRedirect>
  );
};

export default Login;
