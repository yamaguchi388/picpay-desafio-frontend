/* eslint-disable no-unused-vars */
import { Authentication } from 'src/app/shared/types/authentication.type';
export class Authenticate {
  constructor(public authentication: Authentication) {}
  static readonly type = '[Auth] Authenticate';
}
