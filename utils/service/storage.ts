import { LoginResponse, Role } from '../../pages/login/types';

export type UserInfo = LoginResponse | null | undefined;

const key = 'cms';

export function setUserInfo(info: UserInfo): void {
  localStorage.setItem(key, JSON.stringify(info));
}

export function userInfo(): UserInfo {
  try {
    return JSON.parse(localStorage.getItem(key) as string) as UserInfo;
  } catch (error) {
    return null;
  }
}

export function getToken(): string | undefined {
  const user = userInfo();
  return user?.token;
}

export function getRole(): Role | undefined {
  const user = userInfo();

  return user?.role;
}

export function getUserId(): number | undefined {
  const user = userInfo();
  return +user.userId;
}

export function deleteUserInfo(): void {
  localStorage.removeItem(key);
}
