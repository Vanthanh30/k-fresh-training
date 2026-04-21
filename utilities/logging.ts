import { test } from '@playwright/test';

export function step(stepName?: string):
  (target: (this: any, ...args: any[]) => any, context: ClassMethodDecoratorContext) => (this: any, ...args: any[]) => any {
  return function decorator(target: (this: any, ...args: any[]) => any, context: ClassMethodDecoratorContext) {
    return function replacementMethod(this: any, ...args: any[]) {
      const name = stepName ?? `${this.constructor.name}.${String(context.name)}`;
      return test.step(name, () => target.apply(this, args));
    };
  };
}