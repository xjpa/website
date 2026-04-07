import type { BlogPost } from './types';

const postModules = import.meta.glob<{ default: BlogPost }>('./*.ts', {
  eager: true,
});

export const posts = Object.entries(postModules)
  .filter(([path]) => !path.endsWith('/index.ts') && !path.endsWith('/types.ts'))
  .map(([, module]) => module.default)
  .sort((left, right) => right.date.localeCompare(left.date));

export type { BlogPost } from './types';
