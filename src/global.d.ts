import type { CreateNodecgInstance } from 'ts-nodecg/browser';
import type { ReplicantMap } from './types/replicant';

declare global {
  const nodecg: CreateNodecgInstance<
    'tennis',
    undefined,
    ReplicantMap,
    { [x: string]: never }
  >;
}
