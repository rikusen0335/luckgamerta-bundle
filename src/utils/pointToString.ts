import type { ReplicantMap } from '@/types/replicant';

export const pointToString = (
  p: ReplicantMap['scores'][0]['point']
): string => {
  switch (p) {
    case 0:
      return '0';
    case 1:
      return '15';
    case 2:
      return '30';
    case 3:
      return '40';
    case 4:
      return 'Adv.';
    default: {
      const _v: never = p;
      return _v;
    }
  }
};
