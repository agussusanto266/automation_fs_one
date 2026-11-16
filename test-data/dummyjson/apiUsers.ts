import { User } from '../saucedemo/users';

export const apiUsers = {
  validUser: {
    username: 'emilys',
    password: 'emilyspass',
  },

  wrongPasswordUser: {
    username: 'emilys',
    password: 'wrong-password',
  },
} satisfies Record<string, User>;
export { User };

