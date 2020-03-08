import * as firebase from 'firebase/app';
import 'firebase/auth';
import { message } from 'antd';

export const appLogin = async ({ email, password }) => {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      message.config({ maxCount: 1 });
      message.error(error.message);
    });

  const userResult = response ? response.user : null;
  return [userResult];
};
