/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Validator } from '@/services/contracts/Validator';

export class ValidatorStub implements Validator {
  isEmail(_: string): boolean {
    return true;
  }
}
