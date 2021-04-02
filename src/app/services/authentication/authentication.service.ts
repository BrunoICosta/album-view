import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  getUser() {
    const user = this._get('loggedUser');
    if (user) {
      return new User().deserialize(user);
    }
    return null;
  }

  signUp(username: string, password: string) {
    let _id = this._get('_id');
    let users = this._get('users');

    if (!_id) {
      _id = 0;
    }

    _id = _id + 1;

    if (!users || users.length === 0) {
      users = [];
    }

    const user = users.find((u: any) => u.username === username);

    if (user) {
      throw new Error('user-already-exists');
    }

    users = [...users, { id: _id, username, password }];
    this._set('users', users);
    this._set('_id', _id);

    return user;
  }

  login(username: string, password: string) {
    const users = this._get('users') || [];
    const user = users.find((u: any) => u.username === username);

    if (!user) {
      throw new Error('invalid-user');
    }

    if (user.password !== password) {
      throw new Error('invalid-password');
    }

    this._set('loggedUser', user);
    return user;
  }

  logout() {
    this._set('loggedUser', null);
  }

  _set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  _get(key: string): any {
    if (this.storage) {
      const value = this.storage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    }
    return null;
  }

  _remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  _clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
