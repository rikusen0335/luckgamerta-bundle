export function convertHMStoSeconds(original: string): number {
  const hourAndMinuteAndSecond = original.split(":")
  const hourToSecond = parseInt(hourAndMinuteAndSecond[0]) * 60 * 60
  const minuteToSecond = parseInt(hourAndMinuteAndSecond[1]) * 60
  const secondToSecond = parseInt(hourAndMinuteAndSecond[2])

  return hourToSecond + minuteToSecond + secondToSecond;
}
