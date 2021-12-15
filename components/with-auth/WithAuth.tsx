import { Loader } from 'components/loader/Loader';
import { useAppSelector } from 'hooks/use-app-selector';
import Link from 'next/link';
import { ReactElement } from 'react';
import { selectUser } from 'store/slices/user-slice';

import { FallbackComponentWrapper } from './WithAuth.styles';

interface WithAuthProps {
  children: ReactElement;

  // fallback component for un-authenticated users
  fallback?: ReactElement;
}

export const WithAuth = (props: WithAuthProps) => {
  const { children, fallback } = props;
  const user = useAppSelector(selectUser);

  return (
    <Loader loading={user.loading}>
      {user.data
        ? children
        : fallback || (
            <FallbackComponentWrapper>
              Please <Link href="/login">login</Link>
            </FallbackComponentWrapper>
          )}
    </Loader>
  );
};
