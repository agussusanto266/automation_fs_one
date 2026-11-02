import { APIRequestContext } from '@playwright/test';
import { User } from '../test-data/users';

// Endpoin login
export class AuthApi {
  constructor(private request: APIRequestContext) {}

  async login(user: User) {
    return this.request.post('/auth/login', {
      data: {
        username: user.username,
        password: user.password,
        expiresInMins: 30,
      },
    });
  }
}
