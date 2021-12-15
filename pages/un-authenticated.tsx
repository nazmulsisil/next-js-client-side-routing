import { Layout } from 'components/layout';
import { Loader } from 'components/loader/Loader';
import { WithAuth } from 'components/with-auth';
import { useAppSelector } from 'hooks/use-app-selector';
import Link from 'next/link';
import { selectUser } from 'store/slices/user-slice';

const UnAuthenticated = () => {
  const user = useAppSelector(selectUser);

  return (
    <Layout>
      <div>
        <strong>Ask:</strong>
        <ul>
          <li>For everyone regardless of authenticated or un-authenticated</li>
          <li>On hard reload, loading spinners should appear without flash.</li>
          <li>After loading user is done, UI should update accordingly</li>
        </ul>
      </div>

      <hr />

      <Loader loading={user.loading}>
        <h2 style={{ opacity: user.data ? 1 : 0.1 }}>
          user is <span style={{ color: 'green' }}>authenticated</span>
        </h2>
        <h2 style={{ opacity: user.data ? 0.1 : 1 }}>
          user is <span style={{ color: 'red' }}>un-authenticated</span>
        </h2>
      </Loader>

      <div>
        <span>Go to user page here - </span>
        <WithAuth>
          <button>
            <Link href="/user">user page</Link>
          </button>
        </WithAuth>
      </div>
    </Layout>
  );
};

export default UnAuthenticated;
