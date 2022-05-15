export function convertSecondsToHMS(original: number): string {
  return new Date(original * 1000).toISOString().substring(11, 19);
}
