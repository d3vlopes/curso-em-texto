import z from 'zod';

import type { Validator } from '@/services/contracts/Validator';

export class ValidatorAdapter implements Validator {
  isEmail(value: string) {
    const schema = z.email();

    const { success } = schema.safeParse(value);

    return success;
  }
}
