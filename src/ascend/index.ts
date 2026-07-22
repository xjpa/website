import type { AscendEntry } from './types';

const entryModules = import.meta.glob<{ default: AscendEntry }>('./*.ts', {
  eager: true,
});

export const ascendEntries = Object.entries(entryModules)
  .filter(([path]) => !path.endsWith('/index.ts') && !path.endsWith('/types.ts'))
  .map(([, module]) => module.default)
  .sort((left, right) => right.date.localeCompare(left.date));

export type { AscendEntry } from './types';
