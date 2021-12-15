import { UserData } from 'store/slices/user-slice';
import Cookie from 'js-cookie';

const KEY = 'getUser';

/**
 * experimental check if use is already logged in. This util should be deleted once firebase is connected.
 * @returns
 */
export const handleCookieUser = async (): Promise<UserData | undefined> => {
  return new Promise((resolve, reject) => {
    const userCookie = Cookie.get(KEY);
    const userData: UserData | undefined = userCookie
      ? JSON.parse(userCookie)
      : undefined;

    setTimeout(() => {
      resolve(userData);
      // simulate delay
    }, 1000);
  });
};

export const setUserCookie = (userData: UserData) => {
  Cookie.set(KEY, JSON.stringify(userData), { expires: 1 / 24 / 60 });
};

export const deleteUserCookie = () => {
  Cookie.remove(KEY);
};
