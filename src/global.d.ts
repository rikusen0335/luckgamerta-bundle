import type { CreateNodecgInstance } from 'ts-nodecg/browser';
import type { ReplicantMap, MessageMap } from './types';

declare global {
  const nodecg: CreateNodecgInstance<
    'luckgamerta',
    undefined,
    ReplicantMap,
    MessageMap,
  >;
}
