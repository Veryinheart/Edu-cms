import { LoginResponse, Role } from '../../pages/login/types';

export type UserInfo = LoginResponse | null;

export class Storage {
  private key = 'cms';

  setUserInfo(info: UserInfo): void {
    localStorage.setItem(this.key, JSON.stringify(info));
  }

  get userInfo(): UserInfo {
    try {
      return JSON.parse(localStorage.getItem(this.key) as string) as UserInfo;
    } catch (error) {
      return null;
    }
  }

  get token(): string | undefined {
    return this.userInfo?.token;
  }

  get role(): Role | undefined {
    return this.userInfo?.role;
  }

  get userId(): number | undefined {
    return +this.userInfo!.userId;
  }

  deleteUserInfo(): void {
    localStorage.removeItem(this.key);
  }
}

export const storage = new Storage();

export default storage;
