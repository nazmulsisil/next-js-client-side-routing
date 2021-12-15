import { Loader } from 'components/loader/Loader';
import { useAppSelector } from 'hooks/use-app-selector';
import { useRouter } from 'next/router';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { selectUser } from 'store/slices/user-slice';

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * This util should be the top most wrapper of a page if that page requires to redirect user based on authenticated/un-authenticated state.
 * @param param0 userTo: path where the authenticated users should be redirected, visitorTo: path where the unauthenticated users should be redirected
 * @returns children
 */
export const HandleRedirect = ({
  userTo,
  visitorTo,
  children,
  fullPageLoader,
}: {
  children: ReactElement;
  userTo?: string;
  visitorTo?: string;
  fullPageLoader?: boolean;
}) => {
  const router = useRouter();
  const userData = useAppSelector(selectUser);

  const [redirecting, setRedirecting] = useState(false);

  const redirect = useCallback(
    (to: string) => {
      setRedirecting(true);
      router.push(to);
    },
    [router]
  );

  // handleUser
  useIsomorphicLayoutEffect(() => {
    if (userTo && !userData.loading && userData.data) {
      redirect(userTo);
    }
  }, [redirect, userData.data, userData.loading, userTo]);

  // handleVisitor
  useIsomorphicLayoutEffect(() => {
    if (visitorTo && !userData.loading && !userData.data) {
      redirect(visitorTo);
    }
  }, [redirect, userData.data, userData.loading, visitorTo]);

  if (fullPageLoader && userData.loading) {
    return <Loader loading={userData.loading} variant="fullPage" />;
  }

  if (!redirecting) {
    return children;
  }

  // if redirecting
  return <div />;
};
