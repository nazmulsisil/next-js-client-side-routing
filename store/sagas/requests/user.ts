import { UserData } from 'store/slices/user-slice';
import { setUserCookie, deleteUserCookie } from 'utils/handle-cookie-user';

export const requestGetUser = async (): Promise<UserData> => {
  try {
    const response = await fetch('/api/user', { method: 'GET' });
    const userData: UserData = await response.json();
    setUserCookie(userData);
    return userData;
  } catch (error) {
    throw new Error(`"/api/user" getUser fetch failed.`);
  }
};

export const requestRemoveUser = async (): Promise<undefined> => {
  try {
    const response = await fetch('/api/user', { method: 'POST' });
    await response.json();
    deleteUserCookie();
    return undefined;
  } catch (error) {
    throw new Error(`"/api/user" removeUser fetch failed.`);
  }
};
