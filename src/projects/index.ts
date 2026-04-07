import type { Project } from './types';

const projectModules = import.meta.glob<{ default: Project }>('./*.ts', {
  eager: true,
});

export const projects = Object.entries(projectModules)
  .filter(([path]) => !path.endsWith('/index.ts') && !path.endsWith('/types.ts'))
  .map(([, module]) => module.default)
  .sort((left, right) => left.title.localeCompare(right.title));

export type { Project } from './types';
