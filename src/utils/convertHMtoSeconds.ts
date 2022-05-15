export function convertHMtoSeconds(original: string): number {
  const hourAndMinute = original.split(":")
  const hourToSecond = parseInt(hourAndMinute[0]) * 60 * 60
  const minuteToSecond = parseInt(hourAndMinute[1]) * 60

  return hourToSecond + minuteToSecond;
}
