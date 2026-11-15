export type User = {
  username: string;
  password: string;
};

export const users = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  },

  lockedOutUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
};
