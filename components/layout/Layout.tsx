import { Loader } from 'components/loader/Loader';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { useAppSelector } from 'hooks/use-app-selector';
import Link from 'next/link';
import { removeUser, selectUser } from 'store/slices/user-slice';

import styles from '../../styles/Layout.module.css';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div>
      <ul className={styles.links}>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/authenticated">authenticated</Link>
        </li>
        <li>
          <Link href="/un-authenticated">un-authenticated</Link>
        </li>

        <li>
          {user.data ? (
            <button onClick={() => dispatch(removeUser())}>
              <Loader loading={user.loading}>Logout</Loader>
            </button>
          ) : (
            <Link href="/login" passHref>
              <button>
                <Loader loading={user.loading}>
                  You&apos;re not logged in. Go to login page
                </Loader>
              </button>
            </Link>
          )}
        </li>
      </ul>

      <hr />

      <div>{children}</div>
    </div>
  );
};
