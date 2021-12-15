import { HandleRedirect } from 'components/handle-redirect';
import { Layout } from 'components/layout';
import { Loader } from 'components/loader/Loader';
import { useAppSelector } from 'hooks/use-app-selector';
import { useRouter } from 'next/router';
import React from 'react';
import { selectUser } from 'store/slices/user-slice';

// TODO: continue reading docs https://redux-toolkit.js.org/usage/usage-with-typescript#createreducer

export default function App() {
  const router = useRouter();

  const user = useAppSelector(selectUser);

  return (
    <HandleRedirect>
      <Layout>
        <div className="App">
          {user && (
            <h1>
              <span>Hello, </span>
              <Loader loading={user.loading}>{user.data?.firstName}</Loader>
            </h1>
          )}
          <h1>Redux made easy</h1>

          <button
            style={{ fontSize: '3rem', minWidth: '300px' }}
            onClick={() => {
              if (!user.loading) {
                router.push(user.data ? '/authenticated' : '/un-authenticated');
              }
            }}
          >
            <Loader loading={user.loading}>
              {user.data
                ? 'go to authenticated page'
                : 'go to un-authenticated page'}
            </Loader>
          </button>
        </div>
      </Layout>
    </HandleRedirect>
  );
}
