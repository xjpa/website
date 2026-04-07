import type { LifemaxxEntry } from './types';

const entryModules = import.meta.glob<{ default: LifemaxxEntry }>('./*.ts', {
  eager: true,
});

export const lifemaxxEntries = Object.entries(entryModules)
  .filter(([path]) => !path.endsWith('/index.ts') && !path.endsWith('/types.ts'))
  .map(([, module]) => module.default)
  .sort((left, right) => right.date.localeCompare(left.date));

export type { LifemaxxEntry } from './types';
